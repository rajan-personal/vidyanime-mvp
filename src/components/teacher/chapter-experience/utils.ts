import type { ChapterDetails, ChapterTimelineEntry } from "@/data/teacherChapters";
import {
  FLOATING_ASPECT_RATIO,
  FLOATING_DEFAULT_WIDTH,
  FLOATING_MARGIN,
  FLOATING_MIN_WIDTH,
} from "./constants";
import type { FloatingPosition, FloatingSize } from "./types";

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const clampWithMargins = (value: number, size: number, container: number) => {
  const space = container - size;
  if (space <= FLOATING_MARGIN * 2) {
    return clamp(value, 0, Math.max(0, container - size));
  }
  return clamp(value, FLOATING_MARGIN, container - size - FLOATING_MARGIN);
};

export const adjustSizeToBounds = (size: FloatingSize, rect: DOMRect): FloatingSize => {
  const maxWidth = Math.max(FLOATING_MIN_WIDTH, rect.width - FLOATING_MARGIN * 2);
  let width = clamp(size.width, FLOATING_MIN_WIDTH, maxWidth);
  let height = width / FLOATING_ASPECT_RATIO;

  const maxHeight = Math.max(FLOATING_MIN_WIDTH / FLOATING_ASPECT_RATIO, rect.height - FLOATING_MARGIN * 2);
  if (height > maxHeight) {
    height = maxHeight;
    width = height * FLOATING_ASPECT_RATIO;
  }

  return {
    width,
    height,
  };
};

export const getDefaultFloatingSize = (rect: DOMRect): FloatingSize => {
  const maxWidth = Math.max(FLOATING_MIN_WIDTH, rect.width - FLOATING_MARGIN * 2);
  const width = clamp(FLOATING_DEFAULT_WIDTH, FLOATING_MIN_WIDTH, maxWidth);
  return {
    width,
    height: width / FLOATING_ASPECT_RATIO,
  };
};

export const clampFloatingPosition = (position: FloatingPosition, size: FloatingSize, rect: DOMRect): FloatingPosition => {
  return {
    x: clampWithMargins(position.x, size.width, rect.width),
    y: clampWithMargins(position.y, size.height, rect.height),
  };
};

export const getDefaultFloatingPosition = (rect: DOMRect, size: FloatingSize): FloatingPosition => {
  return clampFloatingPosition(
    {
      x: rect.width - size.width - FLOATING_MARGIN,
      y: rect.height - size.height - FLOATING_MARGIN,
    },
    size,
    rect,
  );
};

export const formatTimestamp = (totalSeconds: number): string => {
  const safeSeconds = Number.isFinite(totalSeconds) && totalSeconds >= 0 ? Math.floor(totalSeconds) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const getTimelineHighlights = (timeline: ChapterTimelineEntry[]) => {
  if (!timeline.length) return null;
  return timeline
    .slice(0, 4)
    .map((entry) => `• ${entry.label} (${formatTimestamp(entry.timestamp)})`)
    .join("\n");
};

const getSampleBoosters = (samples: string[] = []) => {
  if (!samples.length) return null;
  return samples.slice(0, 2).map((sample) => `• ${sample}`).join("\n");
};

export const generateAiResponse = (prompt: string, chapter: ChapterDetails): string => {
  const trimmedPrompt = prompt.trim();
  const intro = `You're guiding ${chapter.grade} ${chapter.subject} learners through "${chapter.title}". Here's a suggested flow:`;

  const orderedSteps: string[] = [];
  let step = 1;

  if (trimmedPrompt) {
    orderedSteps.push(`${step++}. Echo their curiosity:\n   "${trimmedPrompt}"`);
  }

  orderedSteps.push(`${step++}. Anchor the idea in chapter context:\n   ${chapter.description}`);

  const timelineHighlights = getTimelineHighlights(chapter.timeline);
  if (timelineHighlights) {
    orderedSteps.push(
      `${step++}. Revisit moments from the chapter:\n   ${timelineHighlights.split("\n").join("\n   ")}`,
    );
  }

  const sampleBoosters = getSampleBoosters(chapter.aiSampleResponse ?? []);
  if (sampleBoosters) {
    orderedSteps.push(`${step++}. Offer quick extensions:\n   ${sampleBoosters.split("\n").join("\n   ")}`);
  }

  orderedSteps.push(
    `${step}. Close by connecting the concept back to classroom routines or local observations.`,
  );

  return [intro, ...orderedSteps].join("\n\n");
};
