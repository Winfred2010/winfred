import React, { useState } from 'react';
import { Comment, User, Story } from '../types';
import { Send, Trash2, Edit2, Check, X, ThumbsUp, Heart, Smile, Sparkles, MessageCircleCode } from 'lucide-react';

interface CommentsPanelProps {
  story: Story;
  currentUser: User;
  comments: Comment[];
  allUsers: User[];
  onAddComment: (text: string) => Promise<void>;
  onEditComment: (commentId: string, text: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onToggleReaction: (commentId: string, emoji: string) => Promise<void>;
}

export function CommentsPanel({
  story,
  currentUser,
  comments,
  allUsers,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onToggleReaction
}: CommentsPanelProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>([]);

  // Simple user resolution helper
  const getUserProfile = (userId: string): User => {
    return allUsers.find(u => u.id === userId) || {
      id: userId,
      username: 'Anonymous Writer',
      email: '',
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userId)}`
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAddComment(newComment);
      setNewComment('');
    } catch (err) {
      alert('Error creating comment: ' + (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedText(comment.commentText);
  };

  const handleEditSubmit = async (commentId: string) => {
    if (!editedText.trim()) return;
    try {
      await onEditComment(commentId, editedText);
      setEditingCommentId(null);
    } catch (err) {
      alert('Error editing comment: ' + (err as Error).message);
    }
  };

  const handleReactionClick = async (commentId: string, emoji: string) => {
    // Explicit Optimistic Update pattern!
    // We notify our parent to execute the reaction API, while locally we simulate the state toggling
    try {
      await onToggleReaction(commentId, emoji);
    } catch (err) {
      // Re-throw or roll back is gracefully coordinated at the parent App.tsx state engine
      alert('Failed to register reaction: ' + (err as Error).message);
    }
  };

  if (story.commentsDisabled) {
    return (
      <div id="comments-disabled-block" className="p-8 text-center bg-gray-50 border border-gray-100 rounded-xl">
        <MessageCircleCode className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <h4 className="text-sm font-semibold text-gray-700">Comments System Terminated</h4>
        <p className="text-xs text-gray-400 mt-1">The creator has disabled comments for this storytelling document.</p>
      </div>
    );
  }

  return (
    <div id="comments-system-container" className="space-y-4">
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
        <span>Story Discussion Thread</span>
        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold">
          {comments.length}
        </span>
      </h3>

      {/* Input Thread Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          id="new-comment-input"
          type="text"
          placeholder="Cast your thought, give structural feedback..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 text-sm px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/15 focus:border-sky-500 transition-all font-medium text-gray-700 bg-gray-50/50"
        />
        <button
          id="send-comment-btn"
          type="submit"
          disabled={!newComment.trim() || isSubmitting}
          className="bg-sky-600 text-white p-2.5 rounded-xl hover:bg-sky-500 disabled:bg-gray-200 transition-colors shrink-0 flex items-center justify-center cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Comment List thread */}
      <div className="space-y-3.5 max-h-[450px] overflow-y-auto pr-1">
        {comments.length === 0 ? (
          <p className="text-xs text-gray-400 py-6 text-center italic">No thoughts yet. Lead the creative discussion!</p>
        ) : (
          [...comments].sort((a,b) => b.timestamp - a.timestamp).map((comment) => {
            const author = getUserProfile(comment.userId);
            const isMyComment = comment.userId === currentUser.id;
            const isStoryOwner = story.authorId === currentUser.id;
            const canDelete = isMyComment || isStoryOwner;

            // Compute reaction occurrences count
            const reactionScores: Record<string, { count: number, active: boolean }> = {};
            if (comment.reactions) {
              Object.entries(comment.reactions).forEach(([uid, rType]) => {
                if (!reactionScores[rType]) {
                  reactionScores[rType] = { count: 0, active: false };
                }
                reactionScores[rType].count += 1;
                if (uid === currentUser.id) {
                  reactionScores[rType].active = true;
                }
              });
            }

            return (
              <div key={comment.id} className="bg-white border border-gray-100 rounded-xl p-3.5 relative group shadow-sm transition-all hover:shadow-md">
                {/* Meta details */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={author.avatarUrl}
                      alt={author.username}
                      className="w-7 h-7 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-xs font-bold text-gray-800">{author.username}</span>
                      <span className="text-[9px] text-gray-400 block font-medium">
                        {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  {/* Actions for deletions or editings */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isMyComment && editingCommentId !== comment.id && (
                      <button
                        onClick={() => startEdit(comment)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-sky-600 transition-colors"
                        title="Edit Comment"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => onDeleteComment(comment.id)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-red-500 transition-colors"
                        title="Delete Comment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Comment Body Text */}
                {editingCommentId === comment.id ? (
                  <div className="space-y-2 mt-1">
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="w-full text-xs p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium text-gray-700"
                      rows={2}
                    />
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => setEditingCommentId(null)}
                        className="px-2.5 py-1 text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-md flex items-center gap-1"
                      >
                        <X className="w-3 h-3" /> Cancel
                      </button>
                      <button
                        onClick={() => handleEditSubmit(comment.id)}
                        className="px-2.5 py-1 text-[10px] bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-md flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-700 leading-relaxed font-normal whitespace-pre-wrap">
                    {comment.commentText}
                  </p>
                )}

                {/* Reactions Thread Bar */}
                <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-gray-50">
                  {/* Reaction trigger quick-dock */}
                  <div className="flex items-center gap-1 bg-gray-50/80 px-2 py-0.5 rounded-full border border-gray-100">
                    {['👍', '❤️', '😮', '🔥'].map((emoji) => {
                      const score = reactionScores[emoji] || { count: 0, active: false };
                      return (
                        <button
                          key={emoji}
                          onClick={() => handleReactionClick(comment.id, emoji)}
                          className={`hover:scale-125 px-1 font-sans text-xs transition-transform ${score.active ? 'opacity-100 scale-110 drop-shadow-sm' : 'opacity-50 hover:opacity-100'}`}
                          title={`React with ${emoji}`}
                        >
                          {emoji}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Reactions Scores Summary */}
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(reactionScores).map(([emoji, meta]) => (
                      <span
                        key={emoji}
                        className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          meta.active
                            ? 'bg-sky-50 border border-sky-200 text-sky-800 font-bold'
                            : 'bg-gray-50 border border-gray-100 text-gray-500'
                        }`}
                      >
                        <span>{emoji}</span>
                        <span>{meta.count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
