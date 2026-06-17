import express from 'express';
import http from 'http';
import path from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import jwt from 'jsonwebtoken';
import { dbStore } from './src/server_db.js';
import { CollabMessage, CursorInfo } from './src/types.js';

const JWT_SECRET = process.env.GEMINI_API_KEY || 'collaborative-story-universe-jwt-key-2026';
const PORT = 3000;

interface AuthenticatedRequest extends express.Request {
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

async function startServer() {
  const app = express();
  const server = http.createServer(app);

  app.use(express.json());

  // CORS headers when needed
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // JWT Middleware validation
  const authenticateToken = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Authentication token is required.' });
      return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
      if (err) {
        res.status(403).json({ error: 'Invalid or expired token.' });
        return;
      }
      req.user = decoded;
      next();
    });
  };

  // --- REST API ENDPOINTS ---

  // Auth: Register User
  app.post('/api/auth/register', (req, res) => {
    const { username, email, avatarUrl } = req.body;
    if (!username || !email) {
      res.status(400).json({ error: 'Username and email are required.' });
      return;
    }

    const existingUsers = dbStore.getUsers();
    let user = existingUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      user = dbStore.createUser({
        id: `user-${Date.now()}`,
        username,
        email,
        avatarUrl: avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}`
      });
    }

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({ user, token });
  });

  // Auth: Login User
  app.post('/api/auth/login', (req, res) => {
    const { userId } = req.body;
    const user = dbStore.getUser(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({ user, token });
  });

  // Auth: Verify Me
  app.get('/api/auth/me', authenticateToken, (req: AuthenticatedRequest, res) => {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated.' });
      return;
    }
    const user = dbStore.getUser(req.user.id);
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }
    res.json({ user });
  });

  // Get All Users
  app.get('/api/users', (req, res) => {
    res.json(dbStore.getUsers());
  });

  // --- Story API ---

  // GET stories
  app.get('/api/stories', (req, res) => {
    res.json(dbStore.getStories());
  });

  // GET single story
  app.get('/api/stories/:id', (req, res) => {
    const story = dbStore.getStory(req.params.id);
    if (!story) {
      res.status(404).json({ error: 'Story not found.' });
      return;
    }
    res.json(story);
  });

  // POST story
  app.post('/api/stories', authenticateToken, (req: AuthenticatedRequest, res) => {
    if (!req.user) return;
    const { title, content, contributors, commentsDisabled } = req.body;

    if (!title || content === undefined) {
      res.status(400).json({ error: 'Title and content are required.' });
      return;
    }

    const story = dbStore.createStory({
      id: `story-${Date.now()}`,
      title,
      content,
      authorId: req.user.id,
      commentsDisabled: !!commentsDisabled,
      contributors: Array.isArray(contributors) ? contributors : [],
      timestamp: Date.now()
    });

    res.json(story);
  });

  // PUT update story (collaborative validation included!)
  app.put('/api/stories/:id', authenticateToken, (req: AuthenticatedRequest, res) => {
    if (!req.user) return;
    const { title, content, contributors, commentsDisabled } = req.body;
    const story = dbStore.getStory(req.params.id);

    if (!story) {
      res.status(404).json({ error: 'Story not found.' });
      return;
    }

    const isAuthor = story.authorId === req.user.id;
    const isContributor = story.contributors.includes(req.user.id);

    if (!isAuthor && !isContributor) {
      res.status(403).json({ error: 'Only the author or allowed contributors are allowed to edit stories.' });
      return;
    }

    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (content !== undefined) updates.content = content;
    if (commentsDisabled !== undefined) updates.commentsDisabled = !!commentsDisabled;
    
    // Only the author can configure permission / contributors list
    if (isAuthor && contributors !== undefined) {
      updates.contributors = Array.isArray(contributors) ? contributors : [];
    }

    const updated = dbStore.updateStory(req.params.id, updates, req.user.id);
    res.json(updated);
  });

  // DELETE story
  app.delete('/api/stories/:id', authenticateToken, (req: AuthenticatedRequest, res) => {
    if (!req.user) return;
    const story = dbStore.getStory(req.params.id);

    if (!story) {
      res.status(404).json({ error: 'Story not found.' });
      return;
    }

    if (story.authorId !== req.user.id) {
      res.status(403).json({ error: 'Only the author of the story is allowed to delete it.' });
      return;
    }

    dbStore.deleteStory(req.params.id);
    res.json({ success: true, message: 'Story deleted successfully.' });
  });

  // --- Comments API (Section 1) ---

  // GET comment list for a story
  app.get('/api/comments/:storyId', (req, res) => {
    const comments = dbStore.getCommentsForStory(req.params.storyId);
    res.json(comments);
  });

  // POST add comment
  app.post('/api/comments', authenticateToken, (req: AuthenticatedRequest, res) => {
    if (!req.user) return;
    const { storyId, commentText } = req.body;

    if (!storyId || !commentText) {
      res.status(400).json({ error: 'storyId and commentText are required.' });
      return;
    }

    const story = dbStore.getStory(storyId);
    if (!story) {
      res.status(404).json({ error: 'Story not found.' });
      return;
    }

    if (story.commentsDisabled) {
      res.status(400).json({ error: 'Comments are disabled on this story.' });
      return;
    }

    const comment = dbStore.createComment({
      id: `comment-${Date.now()}`,
      storyId,
      userId: req.user.id,
      commentText,
      timestamp: Date.now(),
      reactions: {}
    });

    res.json(comment);
  });

  // PATCH update comment (only author)
  app.patch('/api/comments/:id', authenticateToken, (req: AuthenticatedRequest, res) => {
    if (!req.user) return;
    const { commentText } = req.body;
    const comment = dbStore.getComment(req.params.id);

    if (!comment) {
      res.status(404).json({ error: 'Comment not found.' });
      return;
    }

    if (comment.userId !== req.user.id) {
      res.status(403).json({ error: 'Only the author of the comment is able to edit it.' });
      return;
    }

    if (!commentText) {
      res.status(400).json({ error: 'commentText is required.' });
      return;
    }

    const updated = dbStore.updateComment(req.params.id, commentText);
    res.json(updated);
  });

  // DELETE comment (Only author of the comment OR author of the story should be able to delete)
  app.delete('/api/comments/:id', authenticateToken, (req: AuthenticatedRequest, res) => {
    if (!req.user) return;
    const comment = dbStore.getComment(req.params.id);

    if (!comment) {
      res.status(404).json({ error: 'Comment not found.' });
      return;
    }

    const story = dbStore.getStory(comment.storyId);
    if (!story) {
      res.status(404).json({ error: 'Story not found.' });
      return;
    }

    const isCommentAuthor = comment.userId === req.user.id;
    const isStoryAuthor = story.authorId === req.user.id;

    if (!isCommentAuthor && !isStoryAuthor) {
      res.status(403).json({ error: 'Only the comment author or the story author is allowed to delete this comment.' });
      return;
    }

    dbStore.deleteComment(req.params.id);
    res.json({ success: true, message: 'Comment deleted successfully.' });
  });

  // Toggle reaction
  app.post('/api/comments/:id/react', authenticateToken, (req: AuthenticatedRequest, res) => {
    if (!req.user) return;
    const { emoji } = req.body;

    if (!emoji) {
      res.status(400).json({ error: 'Emoji is required.' });
      return;
    }

    const comment = dbStore.toggleReaction(req.params.id, req.user.id, emoji);
    if (!comment) {
      res.status(404).json({ error: 'Comment not found.' });
      return;
    }

    res.json(comment);
  });

  // --- Version Control API (Section 3) ---

  // GET versions list (Only story author, can see previous versions)
  app.get('/api/versions/:storyId', authenticateToken, (req: AuthenticatedRequest, res) => {
    if (!req.user) return;
    const story = dbStore.getStory(req.params.storyId);

    if (!story) {
      res.status(404).json({ error: 'Story not found.' });
      return;
    }

    if (story.authorId !== req.user.id) {
      res.status(403).json({ error: 'Only the author of the story is allowed to view historical versions.' });
      return;
    }

    const versions = dbStore.getVersionsForStory(req.params.storyId);
    res.json(versions);
  });

  // POST restore version (Only story author can restore previous versions)
  app.post('/api/versions/:storyId/restore/:versionId', authenticateToken, (req: AuthenticatedRequest, res) => {
    if (!req.user) return;
    const story = dbStore.getStory(req.params.storyId);

    if (!story) {
      res.status(404).json({ error: 'Story not found.' });
      return;
    }

    if (story.authorId !== req.user.id) {
      res.status(403).json({ error: 'Only the author of the story is allowed to restore historical versions.' });
      return;
    }

    const version = dbStore.getVersion(req.params.versionId);
    if (!version || version.storyId !== req.params.storyId) {
      res.status(404).json({ error: 'Version not found for this story.' });
      return;
    }

    // Save active state into history, then overwrite story content with history
    const restored = dbStore.updateStory(req.params.storyId, {
      title: version.title,
      content: version.content
    }, req.user.id);

    res.json({ success: true, story: restored, message: 'Story successfully restored to selected historical version.' });
  });

  // WebSocket Server Setup
  const wss = new WebSocketServer({ noServer: true });

  // Map of actively connected sockets to metadata
  const clientMetadata = new Map<WebSocket, { userId: string, username: string, storyId: string, color: string }>();

  // Assign random neon color to users for cursor identification
  const CURSOR_COLORS = ['#38bdf8', '#fb7185', '#34d399', '#f43f5e', '#a855f7', '#fb923c', '#facc15'];

  // Handle WebSocket Handshake & Verify with JWT
  server.on('upgrade', (request, socket, head) => {
    const urlObj = new URL(request.url || '', `http://${request.headers.host}`);
    const token = urlObj.searchParams.get('token');

    if (!token) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
      if (err || !decoded) {
        socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
        socket.destroy();
        return;
      }

      // Upgrade success
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request, decoded);
      });
    });
  });

  wss.on('connection', (ws: WebSocket, request: http.IncomingMessage, user: any) => {
    // Keep reference of current active room
    let currentStoryId = '';

    ws.on('message', (messageRaw: string) => {
      try {
        const msg: CollabMessage = JSON.parse(messageRaw);
        const { type, storyId, userId, payload } = msg;

        if (type === 'join_room') {
          currentStoryId = storyId;
          const story = dbStore.getStory(storyId);
          if (!story) return;

          // Keep user session metadata
          const color = CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)];
          clientMetadata.set(ws, { userId, username: user.username, storyId, color });

          // Broadcast Join Notification to other clients in room
          broadcastToRoom(storyId, ws, {
            type: 'user_joined',
            storyId,
            userId,
            payload: {
              userId,
              username: user.username,
              color
            }
          });

          // Send current occupants status to the new joiner
          const activePresences: CursorInfo[] = [];
          clientMetadata.forEach((meta, client) => {
            if (client !== ws && meta.storyId === storyId) {
              activePresences.push({
                userId: meta.userId,
                username: meta.username,
                color: meta.color,
                position: null,
                timestamp: Date.now()
              });
            }
          });

          ws.send(JSON.stringify({
            type: 'presence_sync',
            storyId,
            userId,
            payload: activePresences
          }));

        } else if (type === 'story_edit') {
          // Broadcaster must be authorized (author or contributor)
          const story = dbStore.getStory(storyId);
          if (!story) return;

          if (story.authorId !== user.id && !story.contributors.includes(user.id)) {
            // Reject unauthorized edits securely
            return;
          }

          // Persist the changes silently in SQLite-like store
          dbStore.updateStory(storyId, { content: payload.content, title: payload.title }, user.id);

          // Broadcast content update to everyone else in room
          broadcastToRoom(storyId, ws, {
            type: 'story_edit',
            storyId,
            userId,
            payload: {
              content: payload.content,
              title: payload.title
            }
          });

        } else if (type === 'cursor_move') {
          const meta = clientMetadata.get(ws);
          if (!meta) return;

          // Broadcast cursor position of this contributor to everyone else
          broadcastToRoom(storyId, ws, {
            type: 'cursor_move',
            storyId,
            userId,
            payload: {
              userId,
              username: meta.username,
              color: meta.color,
              position: payload.position // { start: number, end: number }
            }
          });
        }
      } catch (err) {
        console.error('Error handling websocket message:', err);
      }
    });

    ws.on('close', () => {
      const meta = clientMetadata.get(ws);
      if (meta) {
        clientMetadata.delete(ws);
        broadcastToRoom(meta.storyId, null, {
          type: 'user_left',
          storyId: meta.storyId,
          userId: meta.userId,
          payload: { userId: meta.userId }
        });
      }
    });

    function broadcastToRoom(storyId: string, sender: WebSocket | null, payload: any) {
      wss.clients.forEach((client) => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
          const clientMeta = clientMetadata.get(client);
          if (clientMeta && clientMeta.storyId === storyId) {
            client.send(JSON.stringify(payload));
          }
        }
      });
    }
  });


  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Express collaborative server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal crash on server start:', err);
});
