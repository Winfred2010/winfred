/**
 * Type declarations for Collaborative Story Studio
 */

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  authorId: string;
  commentsDisabled: boolean;
  contributors: string[]; // List of user IDs allowed to edit
  timestamp: number;
}

export interface Comment {
  id: string;
  storyId: string;
  userId: string;
  commentText: string;
  timestamp: number;
  reactions: Record<string, string>; // userId -> reactionType (e.g., "👍", "❤️", "😮")
}

export interface StoryVersion {
  id: string;
  storyId: string;
  title: string;
  content: string;
  timestamp: number;
  authorId: string; // User who saved this version
}

// WebSocket Message Types
export type COLLAB_EVENT =
  | 'join_room'
  | 'leave_room'
  | 'story_edit'
  | 'cursor_move'
  | 'user_joined'
  | 'user_left'
  | 'presence_sync';

export interface CollabMessage {
  type: COLLAB_EVENT;
  storyId: string;
  userId: string;
  payload: any;
}

export interface CursorInfo {
  userId: string;
  username: string;
  color: string;
  position: { start: number; end: number } | null;
  timestamp: number;
}
