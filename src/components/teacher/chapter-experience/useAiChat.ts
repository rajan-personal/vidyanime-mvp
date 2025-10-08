"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { createId } from "@paralleldrive/cuid2";

import type { ChapterDetails } from "@/data/teacherChapters";

import { AI_THINKING_DELAY } from "./constants";
import type { ChatMessage } from "./types";
import { generateAiResponse } from "./utils";

const buildAssistantGreeting = (chapter: ChapterDetails) =>
  `You're looking at "${chapter.title}". Ask a question and I'll tailor the answer for ${chapter.grade} ${chapter.subject}.`;

export const useAiChat = (chapter: ChapterDetails) => {
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const [chatInput, setChatInput] = useState(() => chapter.aiPrompt.trim());
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => [
    {
      id: createId(),
      role: "assistant",
      content: buildAssistantGreeting(chapter),
      createdAt: Date.now(),
    },
  ]);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setChatInput(chapter.aiPrompt.trim());
    setChatMessages([
      {
        id: createId(),
        role: "assistant",
        content: buildAssistantGreeting(chapter),
        createdAt: Date.now(),
      },
    ]);
    setAiError(null);
  }, [chapter]);

  useEffect(() => {
    if (!aiError) return;
    if (chatInput.trim().length > 0) {
      setAiError(null);
    }
  }, [aiError, chatInput]);

  useEffect(() => {
    if (!chatScrollRef.current) return;
    chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
  }, [chatMessages, isGenerating]);

  const handleSendMessage = useCallback(() => {
    if (isGenerating) return;
    const trimmedPrompt = chatInput.trim();
    if (!trimmedPrompt) {
      setAiError("Ask a quick question so I know what to respond to.");
      return;
    }

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: trimmedPrompt,
      createdAt: Date.now(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsGenerating(true);
    setAiError(null);

    window.setTimeout(() => {
      try {
        const generatedContent = generateAiResponse(trimmedPrompt, chapter);
        const assistantMessage: ChatMessage = {
          id: createId(),
          role: "assistant",
          content: generatedContent,
          createdAt: Date.now(),
        };
        setChatMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error("AI response generation failed", error);
        setAiError("Couldn’t craft an answer this time. Try rephrasing your question.");
      } finally {
        setIsGenerating(false);
      }
    }, AI_THINKING_DELAY);
  }, [chapter, chatInput, isGenerating]);

  return {
    chatInput,
    setChatInput,
    chatMessages,
    aiError,
    isGenerating,
    handleSendMessage,
    chatScrollRef,
  };
};
