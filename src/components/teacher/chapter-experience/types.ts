import type { ChapterTimelineEntry } from "@/data/teacherChapters";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
};

export type PlaybackState = {
  currentTime: number;
  wasPlaying: boolean;
  volume: number;
  playbackRate: number;
  muted: boolean;
};

export type ActivePanel = "whiteboard" | "documents" | "ai";

export type FloatingPanel = ActivePanel | null;

export type FloatingSize = {
  width: number;
  height: number;
};

export type FloatingPosition = {
  x: number;
  y: number;
};

export type TimelineEntry = ChapterTimelineEntry;
