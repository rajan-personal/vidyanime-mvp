"use client";

import { formatTimestamp } from "./utils";
import type { ChapterDetails } from "@/data/teacherChapters";

interface TimelineSectionProps {
  chapter: ChapterDetails;
  selectedTimestamp: number;
  onSeek: (timestamp: number) => void;
}

export const TimelineSection = ({ chapter, selectedTimestamp, onSeek }: TimelineSectionProps) => {
  return (
    <div className="rounded-[16px] bg-[#F5F8FF] p-5">
      <h2 className="mb-4 font-['Noto_Sans'] text-[18px] font-semibold text-[#1357C6]">Topics Timeline</h2>
      <div className="flex flex-wrap gap-3">
        {chapter.timeline.map((entry) => {
          const isActive = selectedTimestamp === entry.timestamp;
          return (
            <button
              key={`${entry.timestamp}-${entry.label}`}
              onClick={() => onSeek(entry.timestamp)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1357C6] ${
                isActive
                  ? "border-[#1357C6] bg-[#1357C6] text-white"
                  : "border-[#D9D9D9] bg-white text-[#4E4E4E] hover:border-[#1357C6] hover:text-[#1357C6]"
              }`}
            >
              <span>{entry.label}</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs text-[#1357C6]">
                {formatTimestamp(entry.timestamp)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
