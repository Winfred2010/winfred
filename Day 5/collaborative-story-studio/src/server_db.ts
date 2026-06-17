import fs from 'fs';
import path from 'path';
import { User, Story, Comment, StoryVersion } from './types.js';

interface DatabaseSchema {
  users: User[];
  stories: Story[];
  comments: Comment[];
  versions: StoryVersion[];
}

const DB_FILE = path.join(process.cwd(), 'data_store.json');

// High-quality default avatars using beautiful initials or modern icon patterns
const DEFAULT_USERS: User[] = [
  {
    id: 'user-1',
    username: 'Alice Schreiber',
    email: 'alice@storyteller.com',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user-2',
    username: 'Bob Vance',
    email: 'bob@vancefrigeration.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'user-3',
    username: 'Charlie Day',
    email: 'charlie@wildcard.com',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const DEFAULT_STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'The Whispering Lighthouse',
    content: 'For eighty years, the lighthouse on Blackwood Cliff stood silent. Yet, on warm June nights, passing sailors swore they could hear a soft hum vibrating across the water—a melody of ancient, forgotten lullabies.\n\nAlice went up the winding staircase of the lighthouse, holding her lantern high. The stone walls sweat with sea salt, and the wind rattled the iron window panes outside. Each step echoed like a heavy heartbeat. She was determined to find the truth behind her grandfather\'s final log entry.',
    authorId: 'user-1',
    commentsDisabled: false,
    contributors: ['user-2', 'user-3'],
    timestamp: Date.now() - 3600000 * 24 * 3 // 3 days ago
  },
  {
    id: 'story-2',
    title: 'Neon Odyssey 2099',
    content: 'The skies over Neo-Kyoto did not rain water; they rained static. Cybernetic billboards flashed advertisements for neural stimulants while spinners buzzed in the smoggy heights.\n\nJax dialed his cyber-deck. The network was cold, but the signal from the sector-9 mainframe was pulsating with active decryptions. A rogue AI had left a back-door open, and Jax had exactly ninety seconds before the security grid reloaded.',
    authorId: 'user-2',
    commentsDisabled: false,
    contributors: ['user-1'],
    timestamp: Date.now() - 3600000 * 5 // 5 hours ago
  }
];

const DEFAULT_COMMENTS: Comment[] = [
  {
    id: 'comment-1',
    storyId: 'story-1',
    userId: 'user-2',
    commentText: 'This opening hook is superb! It sets the atmospheric, gothic-coastal tone immediately.',
    timestamp: Date.now() - 3600000 * 20,
    reactions: { 'user-1': '👍', 'user-3': '❤️' }
  },
  {
    id: 'comment-2',
    storyId: 'story-1',
    userId: 'user-3',
    commentText: 'Maybe we should describe the sound of her grandfather\'s log more? What did he write exactly?',
    timestamp: Date.now() - 3600000 * 18,
    reactions: { 'user-2': '👍' }
  }
];

const DEFAULT_VERSIONS: StoryVersion[] = [
  {
    id: 'ver-1',
    storyId: 'story-1',
    title: 'The Whispering Lighthouse',
    content: 'For eighty years, the lighthouse on Blackwood Cliff stood silent. On some nights, people said they heard music.',
    timestamp: Date.now() - 3600000 * 24 * 3, // original raw version
    authorId: 'user-1'
  },
  {
    id: 'ver-2',
    storyId: 'story-1',
    title: 'The Whispering Lighthouse',
    content: 'For eighty years, the lighthouse on Blackwood Cliff stood silent. Yet, on warm June nights, passing sailors swore they could hear a soft hum vibrating across the water—a melody of ancient, forgotten lullabies.\n\nAlice went up the winding staircase of the lighthouse, holding her lantern.',
    timestamp: Date.now() - 3600000 * 24 * 1.5, // middle revision
    authorId: 'user-1'
  }
];

export class DBStore {
  private data: DatabaseSchema;

  constructor() {
    this.data = {
      users: [...DEFAULT_USERS],
      stories: [...DEFAULT_STORIES],
      comments: [...DEFAULT_COMMENTS],
      versions: [...DEFAULT_VERSIONS]
    };
    this.load();
  }

  private load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.data = {
          users: parsed.users || [...DEFAULT_USERS],
          stories: parsed.stories || [...DEFAULT_STORIES],
          comments: parsed.comments || [...DEFAULT_COMMENTS],
          versions: parsed.versions || [...DEFAULT_VERSIONS]
        };
      } else {
        this.save();
      }
    } catch (err) {
      console.error('Error loading database:', err);
    }
  }

  private save() {
    try {
      // Ensure directory exists
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving database:', err);
    }
  }

  // Users Helpers
  getUsers(): User[] {
    return this.data.users;
  }

  getUser(id: string): User | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  createUser(user: User): User {
    this.data.users.push(user);
    this.save();
    return user;
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const user = this.getUser(id);
    if (user) {
      Object.assign(user, updates);
      this.save();
    }
    return user;
  }

  // Stories Helpers
  getStories(): Story[] {
    return this.data.stories;
  }

  getStory(id: string): Story | undefined {
    return this.data.stories.find((s) => s.id === id);
  }

  createStory(story: Story): Story {
    this.data.stories.push(story);
    this.save();
    return story;
  }

  updateStory(id: string, updates: Partial<Story>, updaterId: string): Story | undefined {
    const storyIndex = this.data.stories.findIndex((s) => s.id === id);
    if (storyIndex === -1) return undefined;

    const story = this.data.stories[storyIndex];

    // Create a historical version *before* updating if content/title changed significantly
    if (updates.title !== undefined || updates.content !== undefined) {
      this.createVersion({
        id: `ver-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        storyId: story.id,
        title: story.title,
        content: story.content,
        timestamp: Date.now(),
        authorId: updaterId
      });
    }

    const updatedStory = { ...story, ...updates };
    this.data.stories[storyIndex] = updatedStory;
    this.save();
    return updatedStory;
  }

  deleteStory(id: string): boolean {
    const initialLen = this.data.stories.length;
    this.data.stories = this.data.stories.filter((s) => s.id !== id);
    // Also cleanup comments and versions
    this.data.comments = this.data.comments.filter((c) => c.storyId !== id);
    this.data.versions = this.data.versions.filter((v) => v.storyId !== id);
    this.save();
    return this.data.stories.length < initialLen;
  }

  // Comments Helpers
  getCommentsForStory(storyId: string): Comment[] {
    return this.data.comments.filter((c) => c.storyId === storyId);
  }

  getComment(id: string): Comment | undefined {
    return this.data.comments.find((c) => c.id === id);
  }

  createComment(comment: Comment): Comment {
    this.data.comments.push(comment);
    this.save();
    return comment;
  }

  updateComment(id: string, text: string): Comment | undefined {
    const comment = this.getComment(id);
    if (comment) {
      comment.commentText = text;
      this.save();
    }
    return comment;
  }

  deleteComment(id: string): boolean {
    const initialLen = this.data.comments.length;
    this.data.comments = this.data.comments.filter((c) => c.id !== id);
    this.save();
    return this.data.comments.length < initialLen;
  }

  toggleReaction(commentId: string, userId: string, emoji: string): Comment | undefined {
    const comment = this.getComment(commentId);
    if (comment) {
      if (!comment.reactions) {
        comment.reactions = {};
      }
      if (comment.reactions[userId] === emoji) {
        // Toggle off if same reaction clicked
        delete comment.reactions[userId];
      } else {
        comment.reactions[userId] = emoji;
      }
      this.save();
    }
    return comment;
  }

  // Versions Helpers
  getVersionsForStory(storyId: string): StoryVersion[] {
    return this.data.versions.filter((v) => v.storyId === storyId);
  }

  getVersion(id: string): StoryVersion | undefined {
    return this.data.versions.find((v) => v.id === id);
  }

  createVersion(version: StoryVersion): StoryVersion {
    // Keep max 20 versions per story to be reasonable
    const storyVersions = this.getVersionsForStory(version.storyId);
    if (storyVersions.length >= 20) {
      const sorted = [...storyVersions].sort((a, b) => a.timestamp - b.timestamp);
      const oldestId = sorted[0].id;
      this.data.versions = this.data.versions.filter((v) => v.id !== oldestId);
    }
    this.data.versions.push(version);
    this.save();
    return version;
  }
}

export const dbStore = new DBStore();
