import type { ActivePanel } from "./types";

export const FLOATING_ASPECT_RATIO = 16 / 9;
export const FLOATING_MARGIN = 24;
export const FLOATING_MIN_WIDTH = 240;
export const FLOATING_DEFAULT_WIDTH = 360;
export const AI_THINKING_DELAY = 500;

export const whiteboardPalette = ["#1D4ED8", "#DB2777", "#F97316", "#047857", "#0EA5E9", "#1F2937", "#FBBF24"] as const;

export const panelButtons: Array<{ key: ActivePanel; label: string }> = [
  { key: "whiteboard", label: "Whiteboard" },
  { key: "documents", label: "Documents" },
  { key: "ai", label: "AI Assistant" },
];
