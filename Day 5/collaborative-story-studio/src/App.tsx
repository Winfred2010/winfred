import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Feather,
  GitBranch,
  History,
  Info,
  MessageSquare,
  Share2,
  Terminal,
  User as UserIcon,
  PlusCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Twitter,
  Facebook,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';
import { User, Story, Comment, StoryVersion } from './types';
import { StoryEditor } from './components/StoryEditor';
import { StoryDiff } from './components/StoryDiff';
import { CommentsPanel } from './components/CommentsPanel';
import { UserProfile } from './components/UserProfile';
import { TestingSandbox } from './components/TestingSandbox';

export default function App() {
  // Session details
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string>('');
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Core application structures
  const [stories, setStories] = useState<Story[]>([]);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [versions, setVersions] = useState<StoryVersion[]>([]);
  const [selectedVersionId, setSelectedVersionId] = useState<string>('');

  // UI state managers
  const [currentTab, setCurrentTab] = useState<'write' | 'history' | 'profile' | 'sandbox'>('write');
  const [isCreatingStory, setIsCreatingStory] = useState(false);
  const [newStoryTitle, setNewStoryTitle] = useState('');
  const [copyLinkSuccess, setCopyLinkSuccess] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  // Load baseline values once on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load or auto-register standard Alice Scribe session
        const storedToken = localStorage.getItem('story_studio_token');
        let tokenToUse = storedToken || '';
        let resolvedUser: User | null = null;

        if (storedToken) {
          try {
            const meRes = await fetch('/api/auth/me', {
              headers: { Authorization: `Bearer ${storedToken}` }
            });
            if (meRes.ok) {
              const d = await meRes.json();
              resolvedUser = d.user;
            } else {
              localStorage.removeItem('story_studio_token');
              tokenToUse = '';
            }
          } catch {
            tokenToUse = '';
          }
        }

        // Auto-register default creator if no session found
        if (!tokenToUse || !resolvedUser) {
          const regRes = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: 'Alice Schreiber',
              email: 'alice@storyteller.com',
              avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            })
          });
          const d = await regRes.json();
          resolvedUser = d.user;
          tokenToUse = d.token;
          localStorage.setItem('story_studio_token', d.token);
        }

        setCurrentUser(resolvedUser);
        setAuthToken(tokenToUse);

        // Fetch remaining resources from APIs
        await fetchAllSharedContext(tokenToUse, resolvedUser?.id || '');
      } catch (err) {
        console.error('Failure initializing application session:', err);
      }
    };

    initializeApp();
  }, []);

  // Poll for stories list updates periodically
  useEffect(() => {
    if (!authToken) return;
    const interval = setInterval(() => {
      fetchStories();
    }, 12000);
    return () => clearInterval(interval);
  }, [authToken]);

  // Load dependencies triggered on active Story mutations
  useEffect(() => {
    if (!authToken || !activeStoryId) return;
    fetchComments(activeStoryId);
    fetchVersions(activeStoryId);
  }, [activeStoryId, authToken]);

  const fetchAllSharedContext = async (token: string, userId: string) => {
    try {
      // 1. Fetch Users List
      const uRes = await fetch('/api/users');
      if (uRes.ok) {
        const uData = await uRes.json();
        setAllUsers(uData);
      }

      // 2. Fetch Stories List
      const sRes = await fetch('/api/stories');
      if (sRes.ok) {
        const sData: Story[] = await sRes.json();
        setStories(sData);
        if (sData.length > 0 && !activeStoryId) {
          setActiveStoryId(sData[0].id);
        }
      }
    } catch (err) {
      console.error('Error loading resources context:', err);
    }
  };

  const fetchStories = async () => {
    if (!authToken) return;
    try {
      const res = await fetch('/api/stories');
      if (res.ok) {
        const data = await res.json();
        setStories(data);
      }
    } catch (err) {
      console.error('Error fetching stories:', err);
    }
  };

  const fetchComments = async (storyId: string) => {
    try {
      const res = await fetch(`/api/comments/${storyId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const fetchVersions = async (storyId: string) => {
    if (!currentUser) return;
    const story = stories.find(s => s.id === storyId);
    if (!story) return;

    if (story.authorId !== currentUser.id) {
      setVersions([]);
      setSelectedVersionId('');
      return; // Author-only privilege
    }

    try {
      const res = await fetch(`/api/versions/${storyId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setVersions(data);
        if (data.length > 0) {
          setSelectedVersionId(data[data.length - 1].id);
        } else {
          setSelectedVersionId('');
        }
      }
    } catch (err) {
      console.error('Error fetching story versions:', err);
    }
  };

  const handleCreateStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoryTitle.trim() || !authToken) return;

    try {
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          title: newStoryTitle,
          content: `Write the first lines of ${newStoryTitle}...`
        })
      });

      if (res.ok) {
        const data = await res.json();
        setStories(prev => [data, ...prev]);
        setActiveStoryId(data.id);
        setIsCreatingStory(false);
        setNewStoryTitle('');
      } else {
        const err = await res.json();
        alert('Error creating story: ' + err.error);
      }
    } catch (err) {
      alert('Network failure creating story document.');
    }
  };

  const handleSaveStoryDraft = async (
    title: string,
    content: string,
    contributors: string[],
    commentsDisabled: boolean
  ) => {
    if (!activeStoryId || !authToken) return;

    const res = await fetch(`/api/stories/${activeStoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({ title, content, contributors, commentsDisabled })
    });

    if (res.ok) {
      const data = await res.json();
      setStories(prev => prev.map(s => s.id === activeStoryId ? data : s));
      // Flush historical updates silently
      await fetchVersions(activeStoryId);
    } else {
      const err = await res.json();
      throw new Error(err.error || 'Check write credentials permissions');
    }
  };

  // Switch Active Writer profile (JWT integration)
  const handleSwitchIdentity = async (userId: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      if (res.ok) {
        const d = await res.json();
        setCurrentUser(d.user);
        setAuthToken(d.token);
        localStorage.setItem('story_studio_token', d.token);
        
        // Refresh with new authorization contexts
        await fetchAllSharedContext(d.token, d.user.id);
        if (activeStoryId) {
          await fetchComments(activeStoryId);
          await fetchVersions(activeStoryId);
        }
      }
    } catch (err) {
      console.error('Failed switching credentials:', err);
    }
  };

  // Modify Writer pen credentials
  const handleUpdateProfile = async (updates: Partial<User>) => {
    if (!currentUser || !authToken) return;
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: updates.username || currentUser.username,
        email: updates.email || currentUser.email,
        avatarUrl: updates.avatarUrl || currentUser.avatarUrl
      })
    });
    if (res.ok) {
      const d = await res.json();
      setCurrentUser(d.user);
      setAuthToken(d.token);
      localStorage.setItem('story_studio_token', d.token);
      
      const uList = await fetch('/api/users');
      if (uList.ok) {
        setAllUsers(await uList.json());
      }
    } else {
      const err = await res.json();
      throw new Error(err.error || 'Failed updating metadata profile');
    }
  };

  // --- Comment operations ---
  const handleAddComment = async (commentText: string) => {
    if (!activeStoryId || !authToken) return;
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({ storyId: activeStoryId, commentText })
    });

    if (res.ok) {
      const added = await res.json();
      setComments(prev => [added, ...prev]);
    } else {
      const err = await res.json();
      throw new Error(err.error || 'Failed adding comment');
    }
  };

  const handleEditComment = async (commentId: string, text: string) => {
    if (!authToken) return;
    const res = await fetch(`/api/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify({ commentText: text })
    });

    if (res.ok) {
      const updated = await res.json();
      setComments(prev => prev.map(c => c.id === commentId ? updated : c));
    } else {
      const err = await res.json();
      throw new Error(err.error || 'Failed editing comment coordinates');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!authToken) return;
    const res = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` }
    });

    if (res.ok) {
      setComments(prev => prev.filter(c => c.id !== commentId));
    } else {
      const err = await res.json();
      throw new Error(err.error || 'Access to delete comment denied');
    }
  };

  // --- ADVANCED FUNCTIONALITY: Custom OPTIMISTIC REACTION WITH ROLLBACKS ---
  const handleToggleReaction = async (commentId: string, emoji: string) => {
    if (!currentUser || !authToken) return;

    // Save previous state index for potential rollback
    const originalComments = [...comments];

    // Apply change Optimistically to Client State
    setComments(prev =>
      prev.map(c => {
        if (c.id !== commentId) return c;
        const currentReactions = { ...(c.reactions || {}) };
        
        if (currentReactions[currentUser.id] === emoji) {
          delete currentReactions[currentUser.id];
        } else {
          currentReactions[currentUser.id] = emoji;
        }

        return { ...c, reactions: currentReactions }; // updated optimistically
      })
    );

    try {
      const res = await fetch(`/api/comments/${commentId}/react`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ emoji })
      });

      if (!res.ok) {
        throw new Error('Server rejected mutation request for reactions');
      }

      // Read finalized synced state directly
      const syncedComment = await res.json();
      setComments(prev => prev.map(c => c.id === commentId ? syncedComment : c));
    } catch (err) {
      console.warn('[Optimistic Engine] Network dispatch error. Rolling back locally applied reaction.', err);
      // Rollback to original valid state array
      setStories(s => s); // dummy refresh
      setComments(originalComments);
    }
  };

  // --- Git restore operations ---
  const handleRestoreVersion = async (versionId: string) => {
    if (!activeStoryId || !authToken) return;
    setIsRestoring(true);
    try {
      const res = await fetch(`/api/versions/${activeStoryId}/restore/${versionId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        const d = await res.json();
        setStories(prev => prev.map(s => s.id === activeStoryId ? d.story : s));
        await fetchVersions(activeStoryId);
        setCurrentTab('write');
      } else {
        const err = await res.json();
        alert('Restore denied: ' + err.error);
      }
    } catch {
      alert('Network error during file restoration pipeline.');
    } finally {
      setIsRestoring(false);
    }
  };

  const activeStory = stories.find(s => s.id === activeStoryId);
  const selectedVersion = versions.find(v => v.id === selectedVersionId);

  // Social sharing helpers
  const shareUrl = `${window.location.origin}/share/doc-${activeStoryId}`;
  
  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopyLinkSuccess(true);
    setTimeout(() => setCopyLinkSuccess(false), 2500);
  };

  return (
    <div id="full-app-root" className="min-h-screen bg-[#F6F6F6] text-slate-800 font-sans antialiased flex flex-col">
      {/* Head Menu Panel */}
      <header className="bg-white border-b border-gray-100 py-3.5 px-6 sticky top-0 z-40 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-6 h-6 text-sky-600 shrink-0" />
          <div>
            <h1 className="text-base font-bold tracking-tight text-gray-900">
              Collab Story Studio
            </h1>
            <p className="text-[10px] text-gray-400 font-medium">Real-Time Writer Workshop v2.1</p>
          </div>
        </div>

        {currentUser && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-bold block text-gray-800">{currentUser.username}</span>
              <span className="text-[9.5px] text-gray-400 font-semibold">{currentUser.email}</span>
            </div>
            <img
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'}
              alt={currentUser.username}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-500/10 cursor-pointer"
              referrerPolicy="no-referrer"
              onClick={() => setCurrentTab('profile')}
            />
          </div>
        )}
      </header>

      {/* Main Grid Workdesk */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Document selector column */}
        <section className="bg-white rounded-xl border border-gray-100 p-5 space-y-4 shadow-sm h-fit">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <Feather className="w-4 h-4 text-emerald-500" />
              Story manuscripts
            </h2>
            <button
              id="spawn-new-story-btn"
              onClick={() => setIsCreatingStory(!isCreatingStory)}
              className="text-sky-600 hover:text-sky-500 transition-colors cursor-pointer"
              title="Create New Story"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
          </div>

          {/* New Manuscript creation input form inline */}
          {isCreatingStory && (
            <form onSubmit={handleCreateStory} className="p-3 bg-gray-50 border border-gray-100 rounded-xl space-y-2 animate-fadeIn">
              <input
                id="new-story-title"
                required
                type="text"
                placeholder="Manuscript Name..."
                value={newStoryTitle}
                onChange={(e) => setNewStoryTitle(e.target.value)}
                className="w-full text-xs px-2.5 py-2 border border-gray-200 rounded-lg bg-white"
              />
              <div className="flex justify-end gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setIsCreatingStory(false)}
                  className="px-2.5 py-1 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  id="submit-story-create-btn"
                  type="submit"
                  className="px-2.5 py-1 text-[10px] bg-sky-600 hover:bg-sky-500 text-white rounded font-bold"
                >
                  Create
                </button>
              </div>
            </form>
          )}

          {/* Active lists */}
          <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
            {stories.length === 0 ? (
              <span className="text-[11.5px] italic text-gray-400 block text-center py-4">No stories listed.</span>
            ) : (
              stories.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveStoryId(s.id);
                    setCurrentTab('write');
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-semibold border flex flex-col justify-between gap-1 transition-all ${
                    s.id === activeStoryId
                      ? 'bg-sky-50 border-sky-200 font-bold text-sky-950 shadow-sm'
                      : 'bg-white border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-100'
                  }`}
                >
                  <span className="line-clamp-1">{s.title}</span>
                  <span className="text-[9px] text-gray-400 block font-normal flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {new Date(s.timestamp).toLocaleDateString()}
                  </span>
                </button>
              ))
            )}
          </div>
        </section>

        {/* Tab Controls viewport */}
        <section className="lg:col-span-3 space-y-5">
          {/* Main Workspace Navigation header */}
          <div className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-sm flex flex-wrap gap-2 justify-between items-center">
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setCurrentTab('write')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                  currentTab === 'write'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Feather className="w-3.5 h-3.5" />
                Collaborator Studio
              </button>

              <button
                onClick={() => setCurrentTab('history')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                  currentTab === 'history'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                Git History Controls
              </button>

              <button
                onClick={() => setCurrentTab('profile')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                  currentTab === 'profile'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5" />
                Pen Coordinates
              </button>

              <button
                onClick={() => setCurrentTab('sandbox')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                  currentTab === 'sandbox'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                Interactive Vitest & Storybook
              </button>
            </div>

            {/* Document stats */}
            {activeStory && (
              <span className="text-[10px] text-gray-400 font-mono font-bold pr-1.5">
                DOC_REF: {activeStory.id.substring(6)}
              </span>
            )}
          </div>

          {/* Active ViewPort Wrapper with animation and tab components mapping */}
          <div className="space-y-6">
            {activeStory ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentTab}-${activeStory.id}`}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* TAB 1: Real-time Writing Studio + Side comments block */}
                  {currentTab === 'write' && currentUser && (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                      <div className="xl:col-span-2">
                        <StoryEditor
                          story={activeStory}
                          currentUser={currentUser}
                          token={authToken}
                          allUsers={allUsers}
                          onSaveStory={handleSaveStoryDraft}
                        />

                        {/* Social sharing widget placed clean on margins */}
                        <div className="mt-6 bg-white border border-gray-150 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
                          <div className="flex items-center gap-2">
                            <Share2 className="w-4 h-4 text-sky-600 shrink-0" />
                            <div>
                              <h4 className="text-xs font-bold text-gray-800">Advanced Social shareable generator</h4>
                              <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Bypass authorizations to share document metrics with reader nodes.</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              readOnly
                              type="text"
                              value={shareUrl}
                              className="px-3 py-1.5 text-[10px] border border-gray-200 rounded BG-gray-50 select-all font-mono text-gray-600 shrink-0 select-all"
                            />
                            <button
                              onClick={handleCopyShareLink}
                              className="p-1.5 border border-sky-200 bg-sky-50 text-sky-600 rounded hover:bg-sky-100 transition-colors"
                              title="Copy sharing link"
                            >
                              {copyLinkSuccess ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                            <a
                              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out my collaborative story: ${activeStory.title} !`)}&url=${encodeURIComponent(shareUrl)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded transition-colors"
                              title="Share to Twitter"
                            >
                              <Twitter className="w-3.5 h-3.5 text-sky-500" />
                            </a>
                            <a
                              href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded transition-colors"
                              title="Share to Facebook"
                            >
                              <Facebook className="w-3.5 h-3.5 text-blue-600" />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Right Hand Sidebar: Thread discussions */}
                      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-4">
                        <CommentsPanel
                          story={activeStory}
                          currentUser={currentUser}
                          comments={comments}
                          allUsers={allUsers}
                          onAddComment={handleAddComment}
                          onEditComment={handleEditComment}
                          onDeleteComment={handleDeleteComment}
                          onToggleReaction={handleToggleReaction}
                        />
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Version Control Comparisons and restores */}
                  {currentTab === 'history' && (
                    <div className="bg-white border border-gray-100 rounded-xl p-6.5 shadow-sm space-y-6">
                      <div>
                        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                          <History className="w-5 h-5 text-purple-600" />
                          Git-Style Story Version control
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 leading-normal">
                          Only the original Author of this manuscript can see, inspect and restore historical code blocks. Every manual draft save automatically records state.
                        </p>
                      </div>

                      {activeStory.authorId !== currentUser?.id ? (
                        <div className="p-10 text-center bg-gray-50 border border-gray-150 rounded-xl max-w-lg mx-auto">
                          <AlertCircle className="w-10 h-10 text-rose-500/80 mx-auto mb-2" />
                          <h4 className="text-sm font-bold text-gray-800">Privileges Restricted</h4>
                          <p className="text-xs text-gray-400 mt-1.5">
                            You are a designated Scribe Contributor on this document. Previous version comparisons and restores are strictly restricted to the original creator <strong>{allUsers.find(u => u.id === activeStory.authorId)?.username || 'Author'}</strong>.
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                          {/* Versions Timeline List */}
                          <div className="bg-gray-50 border border-gray-150 rounded-xl p-4.5 space-y-3">
                            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider mb-2">Version Stack</span>
                            {versions.length === 0 ? (
                              <p className="text-xs text-gray-400 italic text-center py-6">No previous versions. Commit a draft inside the editor to record history milestones!</p>
                            ) : (
                              <div className="space-y-1.5 max-h-[350px] overflow-y-auto">
                                {[...versions].sort((a,b) => b.timestamp - a.timestamp).map((v) => (
                                  <button
                                    key={v.id}
                                    onClick={() => setSelectedVersionId(v.id)}
                                    className={`w-full text-left p-3 rounded-lg border text-xs flex flex-col gap-1 transition-colors ${
                                      v.id === selectedVersionId
                                        ? 'bg-purple-50 border-purple-200 text-purple-950 font-bold'
                                        : 'bg-white border-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-950'
                                    }`}
                                  >
                                    <div className="flex justify-between items-center">
                                      <span>ver_{v.id.substring(4, 9)}</span>
                                      <span className="text-[10px] text-gray-400 font-normal">{new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-normal italic line-clamp-1">"{v.content.substring(0, 45)}..."</span>
                                    <span className="text-[9px] text-purple-600 block text-right font-medium mt-0.5">👤 {allUsers.find(u => u.id === v.authorId)?.username || 'V_Scribe'}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Diff Comparison Stage */}
                          <div className="lg:col-span-2">
                            {selectedVersion ? (
                              <StoryDiff
                                activeTitle={activeStory.title}
                                activeContent={activeStory.content}
                                selectedVersion={selectedVersion}
                                onRestore={handleRestoreVersion}
                                isRestoring={isRestoring}
                              />
                            ) : (
                              <div className="p-16 border-2 border-dashed border-gray-150 rounded-xl text-center text-gray-400 italic text-xs">
                                Choose a previous version milestone on the timeline to compare line indices.
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: User Profiles identity switcher */}
                  {currentTab === 'profile' && currentUser && (
                    <UserProfile
                      currentUser={currentUser}
                      stories={stories}
                      onUpdateProfile={handleUpdateProfile}
                      onSwitchUser={handleSwitchIdentity}
                      allUsers={allUsers}
                    />
                  )}

                  {/* TAB 4: Testing & storybook playground */}
                  {currentTab === 'sandbox' && (
                    <TestingSandbox />
                  )}

                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="p-12 text-center bg-white border border-gray-100 rounded-xl max-w-md mx-auto">
                <AlertCircle className="w-10 h-10 text-yellow-500 mx-auto" />
                <h4 className="text-sm font-bold text-gray-800 mt-3">Manuscript Index empty</h4>
                <p className="text-xs text-gray-400 mt-1">Please create a manuscript story document in the left sideboard to open the writer workspace.</p>
              </div>
            )}
          </div>
        </section>

      </main>

      <footer className="bg-white border-t border-gray-150 py-4 px-6 text-center text-[11px] text-gray-400 mt-8">
        <p className="font-semibold">Collaborative Story Studio — Built with 100% compliant REST, JWT, sandboxes and websockets protocol streams.</p>
      </footer>
    </div>
  );
}
