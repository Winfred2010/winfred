import React, { useState, useEffect, useRef } from 'react';
import { Story, User, CollabMessage, CursorInfo } from '../types';
import { Save, Users, AlertCircle, Sparkles, UserPlus, FileText, CheckCircle, Smartphone, HelpCircle } from 'lucide-react';

interface StoryEditorProps {
  story: Story;
  currentUser: User;
  token: string;
  allUsers: User[];
  onSaveStory: (title: string, content: string, contributors: string[], commentsDisabled: boolean) => Promise<void>;
}

export function StoryEditor({
  story,
  currentUser,
  token,
  allUsers,
  onSaveStory
}: StoryEditorProps) {
  // Main form fields
  const [title, setTitle] = useState(story.title);
  const [content, setContent] = useState(story.content);
  const [commentsDisabled, setCommentsDisabled] = useState(story.commentsDisabled);
  const [contributors, setContributors] = useState<string[]>(story.contributors || []);
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  
  // Co-collaborator lists synced via Websockets
  const [activePeers, setActivePeers] = useState<Record<string, CursorInfo>>({});
  const [wsConnected, setWsConnected] = useState(false);
  
  // Dual-screen co-author simulation settings
  const [showSimulatedCollab, setShowSimulatedCollab] = useState(false);
  const [collabUser, setCollabUser] = useState<User | null>(null);
  const [collabContent, setCollabContent] = useState('');
  const [collabPeers, setCollabPeers] = useState<Record<string, CursorInfo>>({});
  
  const wsRef = useRef<WebSocket | null>(null);
  const collabWsRef = useRef<WebSocket | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const collabTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  
  const isAuthor = story.authorId === currentUser.id;
  const isContributor = contributors.includes(currentUser.id);
  const canEdit = isAuthor || isContributor;

  // React on story resets
  useEffect(() => {
    setTitle(story.title);
    setContent(story.content);
    setCommentsDisabled(story.commentsDisabled);
    setContributors(story.contributors || []);
  }, [story]);

  // Establish WebSockets connection for Primary User
  useEffect(() => {
    if (!token) return;

    // Resolve ws/wss protocol dynamically based on client SSL state
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socketUrl = `${protocol}//${window.location.host}?token=${encodeURIComponent(token)}`;
    
    console.log('[Collab] Opening websocket for primary user...', socketUrl);
    const ws = new WebSocket(socketUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setWsConnected(true);
      // Join Room
      const joinMsg: CollabMessage = {
        type: 'join_room',
        storyId: story.id,
        userId: currentUser.id,
        payload: {}
      };
      ws.send(JSON.stringify(joinMsg));
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        const { type, payload } = msg;

        if (type === 'story_edit') {
          // If remote edits received, update local state
          if (payload.title !== undefined) setTitle(payload.title);
          if (payload.content !== undefined) setContent(payload.content);
        } else if (type === 'cursor_move') {
          // Map peer cursors
          setActivePeers(prev => ({
            ...prev,
            [payload.userId]: {
              userId: payload.userId,
              username: payload.username,
              color: payload.color,
              position: payload.position,
              timestamp: Date.now()
            }
          }));
        } else if (type === 'user_joined') {
          setActivePeers(prev => ({
            ...prev,
            [payload.userId]: {
              userId: payload.userId,
              username: payload.username,
              color: payload.color,
              position: null,
              timestamp: Date.now()
            }
          }));
        } else if (type === 'user_left') {
          setActivePeers(prev => {
            const next = { ...prev };
            delete next[payload.userId];
            return next;
          });
        } else if (type === 'presence_sync') {
          const syncMap: Record<string, CursorInfo> = {};
          (payload as CursorInfo[]).forEach(peer => {
            syncMap[peer.userId] = peer;
          });
          setActivePeers(syncMap);
        }
      } catch (err) {
        console.error('[Collab] Primary socket error:', err);
      }
    };

    ws.onclose = () => {
      setWsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [story.id, token, currentUser.id]);

  // Spawn Simulated Co-collaborator WebSocket Connection (Toggled side-by-side mode)
  useEffect(() => {
    if (!showSimulatedCollab || !collabUser) {
      if (collabWsRef.current) {
        collabWsRef.current.close();
      }
      return;
    }

    // Authenticate secondary simulation user via temporary handshake tokens
    // Since our mock auth issue is lightweight, let's request a token for the secondary collaborator
    const getSecondarySession = async () => {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: collabUser.id })
        });
        const d = await res.json();
        
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const socketUrl = `${protocol}//${window.location.host}?token=${encodeURIComponent(d.token)}`;
        
        const secWs = new WebSocket(socketUrl);
        collabWsRef.current = secWs;

        secWs.onopen = () => {
          secWs.send(JSON.stringify({
            type: 'join_room',
            storyId: story.id,
            userId: collabUser.id,
            payload: {}
          }));
        };

        secWs.onmessage = (event) => {
          try {
            const msg = JSON.parse(event.data);
            const { type, payload } = msg;

            if (type === 'story_edit') {
              if (payload.content !== undefined) setCollabContent(payload.content);
            } else if (type === 'cursor_move') {
              setCollabPeers(prev => ({
                ...prev,
                [payload.userId]: {
                  userId: payload.userId,
                  username: payload.username,
                  color: payload.color,
                  position: payload.position,
                  timestamp: Date.now()
                }
              }));
            } else if (type === 'user_joined') {
              setCollabPeers(prev => ({
                ...prev,
                [payload.userId]: {
                  userId: payload.userId,
                  username: payload.username,
                  color: payload.color,
                  position: null,
                  timestamp: Date.now()
                }
              }));
            } else if (type === 'user_left') {
              setCollabPeers(prev => {
                const next = { ...prev };
                delete next[payload.userId];
                return next;
              });
            } else if (type === 'presence_sync') {
              const syncMap: Record<string, CursorInfo> = {};
              (payload as CursorInfo[]).forEach(peer => {
                syncMap[peer.userId] = peer;
              });
              setCollabPeers(syncMap);
            }
          } catch (err) {
            console.error('[Collab Sec] Socket error:', err);
          }
        };
      } catch (err) {
        console.error('[Collab] Failed to spin up simulator socket:', err);
      }
    };

    getSecondarySession();

    return () => {
      if (collabWsRef.current) collabWsRef.current.close();
    };
  }, [showSimulatedCollab, collabUser, story.id]);

  // Sync simulated editor field on layout mounts
  useEffect(() => {
    setCollabContent(content);
  }, [content, showSimulatedCollab]);

  // Handle live keystroke edits & socket transfers
  const handleTextChange = (newVal: string) => {
    setContent(newVal);
    
    // Broadcast edits through primary server socket channel
    if (wsConnected && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'story_edit',
        storyId: story.id,
        userId: currentUser.id,
        payload: { content: newVal, title }
      }));
    }
  };

  const handleTitleChange = (newVal: string) => {
    setTitle(newVal);
    if (wsConnected && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'story_edit',
        storyId: story.id,
        userId: currentUser.id,
        payload: { content, title: newVal }
      }));
    }
  };

  const handleCollabTextChange = (newVal: string) => {
    setCollabContent(newVal);
    setContent(newVal); // update primary client state
    
    // Broadcast edits using secondary simulation websocket channel
    if (collabWsRef.current && collabWsRef.current.readyState === WebSocket.OPEN) {
      collabWsRef.current.send(JSON.stringify({
        type: 'story_edit',
        storyId: story.id,
        userId: collabUser?.id || '',
        payload: { content: newVal, title }
      }));
    }
  };

  // Cursor carets and selections position tracking
  const handleSelection = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const selection = { start: target.selectionStart, end: target.selectionEnd };

    if (wsConnected && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'cursor_move',
        storyId: story.id,
        userId: currentUser.id,
        payload: { position: selection }
      }));
    }
  };

  const handleCollabSelection = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const selection = { start: target.selectionStart, end: target.selectionEnd };

    if (collabWsRef.current && collabWsRef.current.readyState === WebSocket.OPEN) {
      collabWsRef.current.send(JSON.stringify({
        type: 'cursor_move',
        storyId: story.id,
        userId: collabUser?.id || '',
        payload: { position: selection }
      }));
    }
  };

  // Safe manual HTTP database commitment
  const handleSaveToDB = async () => {
    setIsSaving(true);
    setSaveStatus('');
    try {
      await onSaveStory(title, content, contributors, commentsDisabled);
      setSaveStatus('Draft committed. New version created in Git control!');
      setTimeout(() => setSaveStatus(''), 4000);
    } catch (err: any) {
      setSaveStatus(err.message || 'Error saving draft');
    } finally {
      setIsSaving(false);
    }
  };

  // Contributor List configuration
  const toggleContributor = (userId: string) => {
    if (!isAuthor) return; // Only creator modifies roles
    setContributors(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const activePeerList = Object.values(activePeers) as CursorInfo[];

  // Pick other characters for dual-collab swapper
  const availableSimActors = allUsers.filter(u => u.id !== currentUser.id);
  
  if (!collabUser && availableSimActors.length > 0) {
    setCollabUser(availableSimActors[0]);
  }

  return (
    <div id="story-editor-workspace" className="space-y-6">
      {/* Collaboration Status Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <span className={`flex h-3.5 w-3.5 rounded-full ${wsConnected ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} />
            {wsConnected && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping top-0 left-0" />
            )}
          </div>
          <div>
            <div className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
              <span>WebSocket Sync Router</span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-md font-mono">
                {wsConnected ? 'SECURE_CON_LIVE' : 'DISCONNECTED'}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">JWT payload authenticated stream</p>
          </div>
        </div>

        {/* Real-time active editors bar */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active Writers:</span>
          <div className="flex -space-x-1.5 overflow-hidden">
            <div
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-sky-500 text-[10px] text-white flex items-center justify-center font-bold relative group"
              title={`${currentUser.username} (You)`}
            >
              <img src={currentUser.avatarUrl} alt="You" className="w-full h-full rounded-full object-cover" />
            </div>

            {activePeerList.map((peer) => {
              const fullProfile = allUsers.find(u => u.id === peer.userId) || currentUser;
              return (
                <div
                  key={peer.userId}
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white flex items-center justify-center text-[10px] text-white font-bold relative group transition-all hover:scale-115 hover:z-10"
                  style={{ backgroundColor: peer.color || '#cbd5e1' }}
                  title={`${peer.username} (Typing...)`}
                >
                  <img src={fullProfile.avatarUrl} alt={peer.username} className="w-full h-full rounded-full object-cover" />
                </div>
              );
            })}
          </div>

          {/* Toggle Dual-Screen sandbox simulation */}
          <button
            onClick={() => setShowSimulatedCollab(!showSimulatedCollab)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              showSimulatedCollab
                ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-200'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            {showSimulatedCollab ? 'Disable Cooperator View' : 'Spawn Co-Author Splitscreen'}
          </button>
        </div>
      </div>

      {/* Primary Writer Stage + optional simulated side-by-side splits */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className={`grid grid-cols-1 ${showSimulatedCollab ? 'lg:grid-cols-2' : ''} gap-5`}>
          
          {/* USER SESS 1: Current Active User Terminal */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="px-2.5 py-1 bg-sky-50 text-sky-800 text-[10.5px] font-bold tracking-wide rounded-md flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                PRIMARY EDITOR — {currentUser.username} (You)
              </span>
              {!canEdit && (
                <span className="text-[10px] text-red-600 font-extrabold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> VIEW ONLY MODE
                </span>
              )}
            </div>

            <div className="space-y-3">
              <input
                id="story-title-input"
                type="text"
                placeholder="Story Title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                disabled={!canEdit}
                className="w-full font-sans text-lg font-bold px-3.5 py-2.5 border border-gray-100 hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500/15 focus:border-sky-500 transition-all text-gray-800 bg-gray-50/20"
              />

              <div className="relative">
                <textarea
                  id="story-content-textarea"
                  ref={textareaRef}
                  placeholder="Tell your majestic story here..."
                  value={content}
                  onChange={(e) => handleTextChange(e.target.value)}
                  onSelect={handleSelection}
                  onKeyUp={handleSelection}
                  onMouseUp={handleSelection}
                  disabled={!canEdit}
                  rows={14}
                  className="w-full text-sm font-sans leading-relaxed p-4 border border-gray-100 hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500/15 focus:border-sky-500 transition-all font-normal text-gray-700 bg-gray-50/20 whitespace-pre-wrap rounded-xl"
                />

                {/* Live Real-time Carets Indicators mapped beside editing fields */}
                <div className="absolute right-4 bottom-4 flex flex-col gap-1 select-none pointer-events-none">
                  {activePeerList.map(peer => {
                    if (peer.position) {
                      return (
                        <div
                          key={peer.userId}
                          className="px-2 py-0.5 text-[9px] font-semibold text-white rounded shadow-sm flex items-center gap-1 animate-pulse"
                          style={{ backgroundColor: peer.color }}
                        >
                          📍 {peer.username}: Char {peer.position.start}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>

            {/* Commit bar and settings triggers */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-1">
                {saveStatus && (
                  <span className="text-xs bg-emerald-50 border border-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 animate-fadeIn">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    {saveStatus}
                  </span>
                )}
              </div>

              {canEdit && (
                <button
                  id="manual-save-story-btn"
                  onClick={handleSaveToDB}
                  disabled={isSaving}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-200 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isSaving ? 'Saving Draft...' : 'Commit Version to Git'}
                </button>
              )}
            </div>
          </div>

          {/* USER SESS 2: Simulated Collaborative Splitscreen Frame */}
          {showSimulatedCollab && (
            <div className="bg-amber-50/30 border border-amber-100 shadow-sm rounded-xl p-5 space-y-4">
              <div className="flex flex-wrap justify-between items-center border-b border-amber-100/80 pb-3">
                <span className="px-2.5 py-1 bg-amber-100 text-amber-950 text-[10.5px] font-mono tracking-wide rounded-md flex items-center gap-1.5">
                  < smartphone className="w-3.5 h-3.5 text-amber-700" />
                  CO-AUTHOR SCREEN (Simulated Real-Time Sockets client)
                </span>
                
                {/* Secondary actor profiles selector */}
                <select
                  value={collabUser?.id || ''}
                  onChange={(e) => {
                    const found = allUsers.find(u => u.id === e.target.value);
                    if (found) setCollabUser(found);
                  }}
                  className="text-xs px-2 py-1 bg-white border border-gray-200 rounded font-medium focus:ring-1 focus:ring-amber-500"
                >
                  {availableSimActors.map(actor => (
                    <option key={actor.id} value={actor.id}>
                      Act as: {actor.username}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <div className="text-[17px] font-bold px-3.5 py-2 text-gray-500 border-b border-gray-100 select-none bg-white/40 rounded-lg">
                  {title || '(Title Sync)'}
                </div>

                <div className="relative">
                  <textarea
                    ref={collabTextareaRef}
                    placeholder="Contribute content simultaneously..."
                    value={collabContent}
                    onChange={(e) => handleCollabTextChange(e.target.value)}
                    onSelect={handleCollabSelection}
                    onKeyUp={handleCollabSelection}
                    onMouseUp={handleCollabSelection}
                    rows={14}
                    className="w-full text-sm font-sans leading-relaxed p-4 border border-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-500/15 focus:border-amber-500 transition-all font-normal text-gray-700 bg-white whitespace-pre-wrap rounded-xl shadow-inner-sm"
                  />

                  {/* Caret tag overlays overlaying inside the sandbox */}
                  <div className="absolute right-4 bottom-4 flex flex-col gap-1 select-none pointer-events-none">
                    <div
                      className="px-2 py-0.5 text-[9px] font-semibold text-white rounded shadow-sm"
                      style={{ backgroundColor: '#2563eb' }}
                    >
                      📍 {currentUser.username} {textareaRef.current ? `(Char ${textareaRef.current.selectionStart})` : ''}
                    </div>
                    {(Object.values(collabPeers) as CursorInfo[]).map(peer => {
                      if (peer.userId !== collabUser?.id && peer.position) {
                        return (
                          <div
                            key={peer.userId}
                            className="px-2 py-0.5 text-[9px] font-semibold text-white rounded bg-purple-600 shadow-sm"
                          >
                            📍 {peer.username} (Char {peer.position.start})
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 p-3 bg-amber-100/50 rounded-xl text-[10.5px] text-amber-900 border border-amber-200/50 leading-relaxed font-medium">
                <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Splitscreen instructions:</strong> Type characters inside the CO-AUTHOR box. Observe how character strokes and selections instantaneously sync using standard JSON JWT sockets protocols!
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Story Configuration Pane (Only Story Author can alter parameters) */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide border-b border-gray-100 pb-2">
            Story Coordinates & Permissions Workspace
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Comments Disable Flag */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Interactive Discussions:</label>
              <p className="text-[11px] text-gray-400 mb-2">Enable or terminate thread logs and reactions entirely for this story.</p>
              <button
                id="toggle-comments-disabled-btn"
                onClick={() => setCommentsDisabled(!commentsDisabled)}
                disabled={!isAuthor}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                  commentsDisabled
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                } ${!isAuthor ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-sm'}`}
              >
                {commentsDisabled ? 'Discussion Threads Suspended' : 'Discussion Threads Active'}
              </button>
            </div>

            {/* Contributor Addition Checkbox Lists */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Scribe Collaborators:</label>
              <p className="text-[11px] text-gray-400 mb-2">Configure writing, editing, and socket-upgrade permissions.</p>

              {isAuthor ? (
                <div className="flex flex-wrap gap-2">
                  {allUsers.filter(u => u.id !== currentUser.id).map((user) => {
                    const isCont = contributors.includes(user.id);
                    return (
                      <button
                        key={user.id}
                        onClick={() => toggleContributor(user.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium border flex items-center gap-1.5 transition-all ${
                          isCont
                            ? 'bg-sky-50 border-sky-300 text-sky-800 font-bold'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <UserPlus className="w-3 h-3" />
                        {user.username}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 font-medium block">Allowed Scribes:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {contributors.length === 0 ? (
                      <span className="text-[11px] text-gray-400 italic">No additional scribes authorized by author.</span>
                    ) : (
                      contributors.map(uid => {
                        const prof = allUsers.find(u => u.id === uid);
                        return (
                          <span key={uid} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-[10px] font-semibold">
                            👤 {prof?.username || uid}
                          </span>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
