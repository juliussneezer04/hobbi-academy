import { CourseCategory } from "./constants";

export interface Course {
  id: string;
  category: CourseCategory;
  title: string;
  description: string;
  courseVideoName: string;
  forumId: string;
}

export interface CourseUser {
  email: string;
  name: string;
  courses: string[];
}

export interface ForumDetails {
  id: string;
  title: string;
  messages: ForumMessage[];
}

export interface ForumMessage {
  content: string;
  author: string;
}

export enum LiveBroadcastEvent {
  JoinEvent = "JoinEvent",
  RoomEvent = "RoomEvent",
  ReactionEvent = "ReactionEvent",
}

export type RoomEvent = {
  x: number;
  y: number;
  value: string;
};

// The type of custom events broadcasted and listened for in this
// room. Must be JSON-serializable.
export type Event =
  | {
      type: "RoomEvent";
      data: RoomEvent;
    }
  | {
      type: "JoinEvent";
      data: JoinEvent;
    }
  | {
      type: "ReactionEvent";
      data: ReactionEvent;
    };

export type Reaction = {
  value: string;
  timestamp: number;
  point: { x: number; y: number };
};

export type JoinEvent = {
  userId: string;
};

export type ReactionEvent = {
  x: number;
  y: number;
  value: string;
};

export const CURSOR_COLORS = [
  "#DC2626",
  "#D97706",
  "#059669",
  "#7C3AED",
  "#DB2777",
];

export type cursor = { x: number; y: number; message?: string } | null;

export enum CursorMode {
  ChatHidden,
  Chat,
  ReactionSelector,
  Reaction,
}

export type CursorState =
  | {
      mode: CursorMode.ChatHidden;
    }
  | {
      mode: CursorMode.Chat;
      message: string;
      previousMessage: string | null;
    }
  | {
      mode: CursorMode.ReactionSelector;
    }
  | {
      mode: CursorMode.Reaction;
      reaction: string;
      isPressed: boolean;
    };