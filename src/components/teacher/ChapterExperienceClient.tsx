"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ArrowLeft } from "lucide-react";

import type { ChapterDetails } from "@/data/teacherChapters";

import { AiPanel } from "./chapter-experience/AiPanel";
import { DocumentPanel } from "./chapter-experience/DocumentPanel";
import { TimelineSection } from "./chapter-experience/TimelineSection";
import { VideoPlayer } from "./chapter-experience/VideoPlayer";
import { WhiteboardPanel } from "./chapter-experience/WhiteboardPanel";
import { panelButtons } from "./chapter-experience/constants";
import type { ActivePanel, PlaybackState } from "./chapter-experience/types";
import { useAiChat } from "./chapter-experience/useAiChat";
import { useDocumentViewer } from "./chapter-experience/useDocumentViewer";
import { useFloatingVideo } from "./chapter-experience/useFloatingVideo";
import { useWhiteboardCanvas } from "./chapter-experience/useWhiteboardCanvas";
import { defaultMaleAvatar } from "@/data/profileAvatars";

interface ChapterExperienceClientProps {
  chapter: ChapterDetails;
  teacherAvatar?: string;
}

const DEFAULT_AVATAR = defaultMaleAvatar;

export function ChapterExperienceClient({ chapter, teacherAvatar = DEFAULT_AVATAR }: ChapterExperienceClientProps) {
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoPlaybackStateRef = useRef<PlaybackState>({
    currentTime: 0,
    wasPlaying: false,
    volume: 1,
    playbackRate: 1,
    muted: false,
  });

  const {
    containerRef: whiteboardContainerRef,
    canvasRef: whiteboardCanvasRef,
    color: whiteboardColor,
    setColor: setWhiteboardColor,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleClear,
    resizeCanvas,
  } = useWhiteboardCanvas();

  const whiteboardPanelRef = useRef<HTMLDivElement | null>(null);
  const documentPanelRef = useRef<HTMLDivElement | null>(null);

  const {
    documentContainerRef,
    pdfUrl,
    pdfName,
    uploadError,
    isDocumentMiniView,
    setIsDocumentMiniView,
    handleUploadDocument,
    toggleMiniView,
  } = useDocumentViewer();

  const aiContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    chatInput,
    setChatInput,
    chatMessages,
    aiError,
    isGenerating,
    handleSendMessage,
    chatScrollRef,
  } = useAiChat(chapter);

  const panelRefs = useMemo(
    () => ({
      whiteboard: whiteboardPanelRef,
      documents: documentPanelRef,
      ai: aiContainerRef,
    }),
    [aiContainerRef, documentPanelRef, whiteboardPanelRef],
  );

  const [dockedVideoMount, setDockedVideoMount] = useState<HTMLDivElement | null>(null);
  const handleDockedVideoMount = useCallback((node: HTMLDivElement | null) => {
    setDockedVideoMount(node ?? null);
  }, []);

  const {
    floatingVideoOverlay,
    floatingVideoPlaceholderMessage,
    isFloatingVideoActive,
    activeFullscreenPanel,
    setActiveFullscreenPanel,
    floatingVideoMount,
  } = useFloatingVideo({
    panelRefs,
  });

  const lastVideoMountRef = useRef<HTMLElement | null>(null);
  const targetVideoMount = floatingVideoMount ?? dockedVideoMount;

  if (targetVideoMount && lastVideoMountRef.current !== targetVideoMount) {
    lastVideoMountRef.current = targetVideoMount;
  } else if (!targetVideoMount && floatingVideoMount === null && dockedVideoMount === null && lastVideoMountRef.current) {
    lastVideoMountRef.current = null;
  }

  const effectiveVideoMount = targetVideoMount ?? lastVideoMountRef.current;

  const videoElementClassName = isFloatingVideoActive
    ? "h-full w-full object-contain"
    : "h-full w-full rounded-[20px] object-cover";

  const [activePanel, setActivePanel] = useState<ActivePanel>("whiteboard");
  const [selectedTimestamp, setSelectedTimestamp] = useState(() => chapter.timeline[0]?.timestamp ?? 0);
  const [isWhiteboardFullscreen, setIsWhiteboardFullscreen] = useState(false);
  const [isDocumentFullscreen, setIsDocumentFullscreen] = useState(false);
  const [isAiFullscreen, setIsAiFullscreen] = useState(false);

  useEffect(() => {
    setSelectedTimestamp(chapter.timeline[0]?.timestamp ?? 0);
    setActivePanel("whiteboard");
  }, [chapter.timeline]);

  const gradientBackground = useMemo(() => {
    switch (chapter.slug) {
      case "india-size-and-location":
        return "from-[#26C6DA] to-[#00ACC1]";
      case "physical-features-of-india":
        return "from-[#AED581] to-[#9CCC65]";
      case "drainage-systems-of-india":
        return "from-[#FFA726] via-[#FF7043] to-[#5C6BC0]";
      case "resources-and-development":
        return "from-[#7F7FD5] via-[#86A8E7] to-[#91EAE4]";
      case "forest-and-wildlife-resources":
        return "from-[#FF9A9E] via-[#FECFEF] to-[#FAD0C4]";
      case "water-resources":
        return "from-[#43CEA2] to-[#185A9D]";
      default:
        return "from-[#1357C6] to-[#1B74E4]";
    }
  }, [chapter.slug]);

  const videoPlaceholderClassName = useMemo(
    () => (isFloatingVideoActive ? "bg-black" : `bg-gradient-to-br ${gradientBackground} rounded-[20px]`),
    [gradientBackground, isFloatingVideoActive],
  );

  const handleSeek = useCallback(
    (timestamp: number) => {
      setSelectedTimestamp(timestamp);

      const currentState = videoPlaybackStateRef.current;
      videoPlaybackStateRef.current = {
        ...currentState,
        currentTime: timestamp,
        wasPlaying: true,
      };

      const video = videoRef.current;
      if (!video) {
        return;
      }

      const applySeek = () => {
        const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : null;
        const safeTime = duration ? Math.min(timestamp, Math.max(duration - 0.1, 0)) : Math.max(timestamp, 0);
        if (!Number.isNaN(safeTime)) {
          video.currentTime = safeTime;
        }

        const playPromise = video.play();
        if (playPromise) {
          void playPromise.catch(() => {});
        }
      };

      if (video.readyState >= 1) {
        applySeek();
        return;
      }

      const handleLoadedData = () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        applySeek();
      };

      video.addEventListener("loadeddata", handleLoadedData);
    },
    [videoPlaybackStateRef, videoRef],
  );

  const toggleWhiteboardFullscreen = useCallback(async () => {
    const panel = whiteboardPanelRef.current;
    if (!panel) return;
    try {
      if (!document.fullscreenElement) {
        await panel.requestFullscreen();
      } else if (document.fullscreenElement === panel) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Failed to toggle whiteboard fullscreen", error);
    }
  }, [whiteboardPanelRef]);

  const toggleDocumentFullscreen = useCallback(async () => {
    const panel = documentPanelRef.current;
    if (!panel) return;
    try {
      if (!document.fullscreenElement) {
        await panel.requestFullscreen();
      } else if (document.fullscreenElement === panel) {
        await document.exitFullscreen();
        setIsDocumentMiniView(false);
      }
    } catch (error) {
      console.error("Failed to toggle document fullscreen", error);
    }
  }, [documentPanelRef, setIsDocumentMiniView]);

  const toggleAiFullscreen = useCallback(async () => {
    const container = aiContainerRef.current;
    if (!container) return;
    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
      } else if (document.fullscreenElement === container) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Failed to toggle AI panel fullscreen", error);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement;
      if (!fullscreenElement) {
        setIsWhiteboardFullscreen(false);
        setIsDocumentFullscreen(false);
        setIsAiFullscreen(false);
        setIsDocumentMiniView(false);
        setActiveFullscreenPanel(null);
        return;
      }

      const isWhiteboardTarget = fullscreenElement === whiteboardPanelRef.current;
      const isDocumentTarget = fullscreenElement === documentPanelRef.current;
      const isAiTarget = fullscreenElement === aiContainerRef.current;

      setIsWhiteboardFullscreen(isWhiteboardTarget);
      setIsDocumentFullscreen(isDocumentTarget);
      setIsAiFullscreen(isAiTarget);

      if (!isDocumentTarget) {
        setIsDocumentMiniView(false);
      }

      if (isWhiteboardTarget) {
        resizeCanvas();
      }

      setActiveFullscreenPanel(
        isWhiteboardTarget ? "whiteboard" : isDocumentTarget ? "documents" : isAiTarget ? "ai" : null,
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [aiContainerRef, documentPanelRef, resizeCanvas, setActiveFullscreenPanel, setIsDocumentMiniView, whiteboardPanelRef]);

  return (
    <div className="min-h-screen bg-[#F7F7F7] pb-8">
      <div className="pt-[156px] px-[130px]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/teacher-dashboard")}
              className="flex items-center gap-2 rounded-full border border-[#D9D9D9] px-5 py-2 text-[#1357C6] transition hover:bg-[#1357C6] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Chapters
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-semibold text-[#4E4E4E]">{chapter.grade}</p>
                <p className="text-sm text-[#6F7787]">{chapter.subject}</p>
              </div>
              <Image
                src={teacherAvatar}
                alt="Teacher"
                width={56}
                height={56}
                unoptimized
                className="h-14 w-14 rounded-full object-cover"
              />
            </div>
          </div>

          <div className="rounded-[20px] bg-white p-8 shadow-[0px_0px_8px_rgba(0,0,0,0.06)]">
            <div className="mb-6 flex flex-col gap-2">
              <span className="text-sm uppercase tracking-[0.3em] text-[#6F7787]">Chapter {chapter.chapterNumber}</span>
              <h1 className="font-['Noto_Sans'] text-[32px] font-semibold leading-[42px] text-[#1357C6]">
                {chapter.title}
              </h1>
              <p className="max-w-3xl text-[16px] leading-[24px] text-[#4E4E4E]">{chapter.description}</p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <div className="space-y-6">
                <div
                  className={`relative overflow-hidden rounded-[20px] bg-gradient-to-br ${gradientBackground}`}
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <div
                    ref={handleDockedVideoMount}
                    className="absolute inset-0 h-full w-full rounded-[20px] overflow-hidden"
                    data-docked-video-mount
                  />
                  {isFloatingVideoActive ? (
                    <div
                      className={`relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 rounded-[20px] bg-gradient-to-br ${gradientBackground} text-center text-sm font-medium text-white shadow-inner`}
                    >
                      <span>{floatingVideoPlaceholderMessage}</span>
                      <span className="text-xs text-white/80">Resize or move the video inside the fullscreen panel.</span>
                    </div>
                  ) : null}
                </div>

                <TimelineSection chapter={chapter} selectedTimestamp={selectedTimestamp} onSeek={handleSeek} />
              </div>

              <aside className="flex flex-col gap-4">
                <div className="flex rounded-full bg-[#F0F3F8] p-2">
                  {panelButtons.map((panel) => {
                    const isActive = activePanel === panel.key;
                    const isLockedByFullscreen =
                      activeFullscreenPanel !== null && activeFullscreenPanel !== panel.key;
                    return (
                      <button
                        key={panel.key}
                        onClick={() => setActivePanel(panel.key)}
                        disabled={isLockedByFullscreen}
                        className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1357C6] ${
                          isActive ? "bg-white text-[#1357C6] shadow" : "text-[#6F7787] hover:text-[#1357C6]"
                        } ${isLockedByFullscreen ? "cursor-not-allowed opacity-60" : ""}`}
                      >
                        {panel.label}
                      </button>
                    );
                  })}
                </div>

                <div className="relative flex-1 overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-white shadow-inner">
                  {activePanel === "whiteboard" ? (
                    <WhiteboardPanel
                      panelRef={whiteboardPanelRef}
                      containerRef={whiteboardContainerRef}
                      canvasRef={whiteboardCanvasRef}
                      color={whiteboardColor}
                      onColorChange={setWhiteboardColor}
                      isFullscreen={isWhiteboardFullscreen}
                      onToggleFullscreen={toggleWhiteboardFullscreen}
                      onClear={handleClear}
                      handlePointerDown={handlePointerDown}
                      handlePointerMove={handlePointerMove}
                      handlePointerUp={handlePointerUp}
                    />
                  ) : null}

                  {activePanel === "ai" ? (
                    <AiPanel
                      chapter={chapter}
                      containerRef={aiContainerRef}
                      chatMessages={chatMessages}
                      chatScrollRef={chatScrollRef}
                      chatInput={chatInput}
                      onChatInputChange={setChatInput}
                      onSendMessage={handleSendMessage}
                      isGenerating={isGenerating}
                      aiError={aiError}
                      isFullscreen={isAiFullscreen}
                      onToggleFullscreen={toggleAiFullscreen}
                    />
                  ) : null}

                  {activePanel === "documents" ? (
                    <DocumentPanel
                      panelRef={documentPanelRef}
                      containerRef={documentContainerRef}
                      pdfUrl={pdfUrl}
                      pdfName={pdfName}
                      uploadError={uploadError}
                      isMiniView={isDocumentMiniView}
                      onToggleMiniView={toggleMiniView}
                      onUpload={handleUploadDocument}
                      isFullscreen={isDocumentFullscreen}
                      onToggleFullscreen={toggleDocumentFullscreen}
                    />
                  ) : null}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <VideoPlayer
        chapter={chapter}
        mountNode={effectiveVideoMount}
        placeholderClassName={videoPlaceholderClassName}
        videoClassName={videoElementClassName}
        videoRef={videoRef}
        playbackStateRef={videoPlaybackStateRef}
      />
      {floatingVideoOverlay}
    </div>
  );
}
