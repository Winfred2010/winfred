import React, { useState } from 'react';
import { User, Story } from '../types';
import { UserCheck, Mail, ShieldAlert, Award, Feather, FileText, CheckCircle } from 'lucide-react';

interface UserProfileProps {
  currentUser: User;
  stories: Story[];
  onUpdateProfile: (updatedUser: Partial<User>) => Promise<void>;
  onSwitchUser: (userId: string) => void;
  allUsers: User[];
}

export function UserProfile({
  currentUser,
  stories,
  onUpdateProfile,
  onSwitchUser,
  allUsers
}: UserProfileProps) {
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Collect stats
  const authoredStories = stories.filter(s => s.authorId === currentUser.id);
  const contributedStories = stories.filter(s => s.contributors.includes(currentUser.id));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setStatusMessage('');
    try {
      await onUpdateProfile({ username, email, avatarUrl });
      setStatusMessage('Profile updated successfully!');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err: any) {
      setStatusMessage(err.message || 'Error updating profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const selectPredefinedAvatar = (seed: string) => {
    const url = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`;
    setAvatarUrl(url);
  };

  return (
    <div id="user-profile-root" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Settings Form Card */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-sky-600" />
          Writer Profile Coordinates
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Pen Name / Username
            </label>
            <input
              id="profile-username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-gray-800 bg-gray-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              id="profile-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-gray-800 bg-gray-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Avatar Image URL / Dye Selection
            </label>
            <input
              id="profile-avatar"
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full text-sm px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-mono text-gray-600 bg-gray-50/50"
            />
            {/* Quick avatar dye palette selector */}
            <div className="mt-2.5">
              <span className="text-[11px] text-gray-400 block mb-1 font-medium">Quick Dye Selector (Artistic Generation seeds):</span>
              <div className="flex flex-wrap gap-2">
                {['Ink', 'Scribe', 'Muse', 'Quill', 'Cosmo'].map((seed) => (
                  <button
                    key={seed}
                    type="button"
                    onClick={() => selectPredefinedAvatar(seed)}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-200/60 rounded text-[10px] text-gray-600 font-bold transition-colors"
                  >
                    🎲 Seed: {seed}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {statusMessage && (
            <div className="p-3 bg-sky-50 border border-sky-100 text-sky-800 rounded-lg text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-sky-600 shrink-0" />
              {statusMessage}
            </div>
          )}

          <div className="pt-2 border-t border-gray-100 flex justify-end">
            <button
              id="save-profile-btn"
              type="submit"
              disabled={isUpdating}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 disabled:bg-gray-400 text-white rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              {isUpdating ? 'Saving coordinates...' : 'Save Coordinates'}
            </button>
          </div>
        </form>
      </div>

      {/* Writer Stats & Mock Switcher Sidebar */}
      <div className="space-y-6">
        {/* Profile Card Summary */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
          <div className="relative inline-block mb-3">
            <img
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'}
              alt={currentUser.username}
              className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-sky-500/10"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-1 px-1.5 py-0.5 bg-sky-600 text-[9px] text-white rounded-full font-extrabold uppercase">
              ACTive
            </span>
          </div>
          <h4 className="text-base font-bold text-gray-900">{currentUser.username}</h4>
          <span className="text-xs text-gray-400 flex items-center justify-center gap-1 mt-0.5">
            <Mail className="w-3 h-3" />
            {currentUser.email}
          </span>

          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-gray-100 pt-4 text-left">
            <div className="p-3 bg-gray-50/50 rounded-lg">
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Authored</span>
              <span className="text-xl font-bold text-gray-800 flex items-center gap-1.5 mt-0.5">
                <Feather className="w-4 h-4 text-emerald-500" />
                {authoredStories.length}
              </span>
            </div>
            <div className="p-3 bg-gray-50/50 rounded-lg">
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Collab Room</span>
              <span className="text-xl font-bold text-gray-800 flex items-center gap-1.5 mt-0.5">
                <FileText className="w-4 h-4 text-sky-500" />
                {contributedStories.length}
              </span>
            </div>
          </div>
        </div>

        {/* Demo Switch Workspace Identity Card */}
        <div className="bg-amber-50/80 rounded-xl border border-amber-100/80 p-5">
          <div className="flex gap-2 mb-3">
            <Award className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
              Identity Switcher Dashboard
            </h4>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed mb-4">
            Test multi-user features (collaborations, cursor tracking, owner privileges) by immediately swapping keys to another writer profile!
          </p>
          <div className="space-y-2">
            {allUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => onSwitchUser(user.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                  user.id === currentUser.id
                    ? 'bg-white border-amber-300 text-amber-900 ring-4 ring-amber-400/10 font-bold'
                    : 'bg-white/40 hover:bg-white border-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="w-6 h-6 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span>{user.username}</span>
                </div>
                {user.id === currentUser.id && (
                  <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 bg-amber-600 text-white rounded">
                    You
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
