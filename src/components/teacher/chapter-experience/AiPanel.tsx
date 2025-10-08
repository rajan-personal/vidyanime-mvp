"use client";

import { type MutableRefObject } from "react";

import { Loader2, Maximize2, Minimize2 } from "lucide-react";

import type { ChapterDetails } from "@/data/teacherChapters";

import type { ChatMessage } from "./types";

interface AiPanelProps {
  chapter: ChapterDetails;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  chatMessages: ChatMessage[];
  chatScrollRef: MutableRefObject<HTMLDivElement | null>;
  chatInput: string;
  onChatInputChange: (value: string) => void;
  onSendMessage: () => void;
  isGenerating: boolean;
  aiError: string | null;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const AiPanel = ({
  chapter,
  containerRef,
  chatMessages,
  chatScrollRef,
  chatInput,
  onChatInputChange,
  onSendMessage,
  isGenerating,
  aiError,
  isFullscreen,
  onToggleFullscreen,
}: AiPanelProps) => {
  return (
    <div ref={containerRef} className="relative flex h-full min-h-0 flex-col bg-white">
      <div className="flex items-start justify-between border-b border-[#E5E7EB] bg-white/95 px-5 py-4 shadow-sm backdrop-blur">
        <div>
          <h3 className="text-lg font-semibold text-[#1357C6]">AI Lesson Chat</h3>
          <p className="text-sm text-[#6F7787]">Ask a question and get a chapter-aware answer in seconds.</p>
        </div>
        <button
          onClick={onToggleFullscreen}
          className="rounded-full border border-[#D9D9D9] bg-white/90 p-2 text-[#303540] transition hover:border-[#1357C6] hover:text-[#1357C6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1357C6]"
          aria-label={isFullscreen ? "Exit AI panel fullscreen" : "Enter AI panel fullscreen"}
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      </div>
      <div className="flex flex-1 min-h-0 flex-col gap-4 p-5">
        <div
          ref={chatScrollRef}
          className="flex-1 min-h-0 overflow-y-auto rounded-[16px] border border-[#E2E8F0] bg-[#F8FAFF] p-4 shadow-inner"
        >
          <div className="flex flex-col gap-3">
            {chatMessages.map((message) => {
              const isUser = message.role === "user";
              const bubbleClasses = isUser
                ? "ml-auto bg-white text-[#0F172A] border border-[#C7D7FF]"
                : "mr-auto bg-[#1357C6] text-white";
              const alignment = isUser ? "items-end" : "items-start";
              return (
                <div key={message.id} className={`flex ${alignment}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${bubbleClasses}`}>
                    {message.content.split("\n").map((line, idx) => (
                      <p key={`${message.id}-line-${idx}`} className={idx > 0 ? "mt-2" : undefined}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
            {isGenerating ? (
              <div className="flex items-start">
                <div className="mr-auto flex max-w-[75%] items-center gap-3 rounded-2xl bg-[#1357C6] px-4 py-3 text-sm text-white shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Thinking with the chapter…</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {aiError ? (
          <p className="rounded-[12px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-2 text-sm text-[#B91C1C]">{aiError}</p>
        ) : null}
        <div className="rounded-[16px] border border-[#D9D9D9] bg-white p-4 shadow-sm">
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6F7787]">
            Your question
            <textarea
              value={chatInput}
              onChange={(event) => onChatInputChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                  event.preventDefault();
                  onSendMessage();
                }
              }}
              rows={3}
              className="w-full resize-none rounded-[12px] border border-[#D9D9D9] px-4 py-3 text-sm text-[#1F2937] shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1357C6]"
              placeholder={`Example: How do I explain ${chapter.title.toLowerCase()} with a simple activity?`}
            />
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#6F7787]">Press ⌘+Enter to send. I’ll blend chapter context with classroom-ready cues.</p>
            <button
              onClick={onSendMessage}
              disabled={isGenerating}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1357C6] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0F47A6] disabled:cursor-not-allowed disabled:bg-[#93B3F5]"
            >
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              <span>{isGenerating ? "Working" : "Send"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
