"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Move, X } from "lucide-react";

import { FLOATING_ASPECT_RATIO, FLOATING_MARGIN, FLOATING_MIN_WIDTH } from "./constants";
import type { FloatingPanel, FloatingPosition, FloatingSize } from "./types";
import {
  adjustSizeToBounds,
  clamp,
  clampFloatingPosition,
  getDefaultFloatingPosition,
  getDefaultFloatingSize,
} from "./utils";

type PanelRefs = {
  whiteboard: React.MutableRefObject<HTMLDivElement | null>;
  documents: React.MutableRefObject<HTMLDivElement | null>;
  ai: React.MutableRefObject<HTMLDivElement | null>;
};

type DragState = {
  offsetX: number;
  offsetY: number;
  rect: DOMRect;
};

type ResizeState = {
  startX: number;
  startY: number;
  initialWidth: number;
  initialHeight: number;
  rect: DOMRect;
};

interface UseFloatingVideoParams {
  panelRefs: PanelRefs;
}

export const useFloatingVideo = ({ panelRefs }: UseFloatingVideoParams) => {
  const floatingContainerRectRef = useRef<DOMRect | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const resizeStateRef = useRef<ResizeState | null>(null);
  const floatingVideoSizeRef = useRef<FloatingSize>({
    width: 360,
    height: 360 / FLOATING_ASPECT_RATIO,
  });
  const floatingVideoPositionRef = useRef<FloatingPosition>({
    x: FLOATING_MARGIN,
    y: FLOATING_MARGIN,
  });

  const [floatingVideoHost, setFloatingVideoHost] = useState<HTMLElement | null>(null);
  const [floatingVideoSize, setFloatingVideoSize] = useState<FloatingSize>(floatingVideoSizeRef.current);
  const [floatingVideoPosition, setFloatingVideoPosition] = useState<FloatingPosition>(
    floatingVideoPositionRef.current,
  );
  const [activeFullscreenPanel, setActiveFullscreenPanel] = useState<FloatingPanel>(null);
  const [floatingVideoMount, setFloatingVideoMount] = useState<HTMLDivElement | null>(null);

  const handleFloatingMountRef = useCallback((node: HTMLDivElement | null) => {
    setFloatingVideoMount(node ?? null);
  }, []);

  const updateFloatingVideoSize = useCallback((value: FloatingSize | ((prev: FloatingSize) => FloatingSize)) => {
    setFloatingVideoSize((prev) => {
      const next = typeof value === "function" ? (value as (prev: FloatingSize) => FloatingSize)(prev) : value;
      floatingVideoSizeRef.current = next;
      return next;
    });
  }, []);

  const updateFloatingVideoPosition = useCallback(
    (value: FloatingPosition | ((prev: FloatingPosition) => FloatingPosition)) => {
      setFloatingVideoPosition((prev) => {
        const next =
          typeof value === "function" ? (value as (prev: FloatingPosition) => FloatingPosition)(prev) : value;
        floatingVideoPositionRef.current = next;
        return next;
      });
    },
    [],
  );

  const handleContainerResize = useCallback(() => {
    if (!floatingVideoHost) return;

    const rect = floatingVideoHost.getBoundingClientRect();
    floatingContainerRectRef.current = rect;

    const adjustedSize = adjustSizeToBounds(floatingVideoSizeRef.current, rect);
    updateFloatingVideoSize(adjustedSize);
    updateFloatingVideoPosition((prev) => {
      const clamped = clampFloatingPosition(prev, adjustedSize, rect);
      if (activeFullscreenPanel === "ai") {
        return {
          ...clamped,
          y: Math.max(clamped.y, 112),
        };
      }
      return clamped;
    });
  }, [activeFullscreenPanel, floatingVideoHost, updateFloatingVideoPosition, updateFloatingVideoSize]);

  useEffect(() => {
    if (!activeFullscreenPanel) {
      setFloatingVideoHost(null);
      return;
    }

    const target = panelRefs[activeFullscreenPanel]?.current;

    if (!target) {
      setFloatingVideoHost(null);
      return;
    }

    setFloatingVideoHost(target);
    const rect = target.getBoundingClientRect();
    floatingContainerRectRef.current = rect;
    const defaultSize = getDefaultFloatingSize(rect);
    let preferredPosition = getDefaultFloatingPosition(rect, defaultSize);
    if (activeFullscreenPanel === "ai") {
      preferredPosition = clampFloatingPosition(
        { ...preferredPosition, y: Math.max(preferredPosition.y, 112) },
        defaultSize,
        rect,
      );
    }
    updateFloatingVideoSize(defaultSize);
    updateFloatingVideoPosition(preferredPosition);
  }, [activeFullscreenPanel, panelRefs, updateFloatingVideoPosition, updateFloatingVideoSize]);

  useEffect(() => {
    if (!floatingVideoHost) return;

    handleContainerResize();

    const observer = new ResizeObserver(() => {
      handleContainerResize();
    });

    observer.observe(floatingVideoHost);

    return () => observer.disconnect();
  }, [floatingVideoHost, handleContainerResize]);

  const resetFloatingVideo = useCallback(() => {
    if (!floatingVideoHost) return;
    const rect = floatingVideoHost.getBoundingClientRect();
    floatingContainerRectRef.current = rect;
    const defaultSize = getDefaultFloatingSize(rect);
    let preferredPosition = getDefaultFloatingPosition(rect, defaultSize);
    if (activeFullscreenPanel === "ai") {
      preferredPosition = clampFloatingPosition(
        { ...preferredPosition, y: Math.max(preferredPosition.y, 112) },
        defaultSize,
        rect,
      );
    }
    updateFloatingVideoSize(defaultSize);
    updateFloatingVideoPosition(preferredPosition);
  }, [activeFullscreenPanel, floatingVideoHost, updateFloatingVideoPosition, updateFloatingVideoSize]);

  const handleDragPointerMove = useCallback(
    (event: PointerEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState) return;

      const candidatePosition: FloatingPosition = {
        x: event.clientX - dragState.offsetX,
        y: event.clientY - dragState.offsetY,
      };
      const rect = dragState.rect;
      const size = floatingVideoSizeRef.current;
      const clampedPosition = clampFloatingPosition(candidatePosition, size, rect);
      updateFloatingVideoPosition(clampedPosition);
    },
    [updateFloatingVideoPosition],
  );

  const handleDragPointerUp = useCallback(() => {
    dragStateRef.current = null;
    window.removeEventListener("pointermove", handleDragPointerMove);
    window.removeEventListener("pointerup", handleDragPointerUp);
    window.removeEventListener("pointercancel", handleDragPointerUp);
  }, [handleDragPointerMove]);

  const handleFloatingDragStart = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!floatingVideoHost) return;
      event.preventDefault();
      const rect = floatingVideoHost.getBoundingClientRect();
      floatingContainerRectRef.current = rect;

      dragStateRef.current = {
        offsetX: event.clientX - floatingVideoPositionRef.current.x,
        offsetY: event.clientY - floatingVideoPositionRef.current.y,
        rect,
      };

      window.addEventListener("pointermove", handleDragPointerMove);
      window.addEventListener("pointerup", handleDragPointerUp);
      window.addEventListener("pointercancel", handleDragPointerUp);
    },
    [floatingVideoHost, handleDragPointerMove, handleDragPointerUp],
  );

  const handleResizePointerMove = useCallback(
    (event: PointerEvent) => {
      const resizeState = resizeStateRef.current;
      if (!resizeState) return;

      const { startX, rect, initialWidth } = resizeState;
      const deltaX = event.clientX - startX;
      const maxWidth = Math.max(
        FLOATING_MIN_WIDTH,
        rect.width - floatingVideoPositionRef.current.x - FLOATING_MARGIN,
      );
      let width = clamp(initialWidth + deltaX, FLOATING_MIN_WIDTH, maxWidth);
      let height = width / FLOATING_ASPECT_RATIO;

      const maxHeight = Math.max(
        FLOATING_MIN_WIDTH / FLOATING_ASPECT_RATIO,
        rect.height - floatingVideoPositionRef.current.y - FLOATING_MARGIN,
      );

      if (height > maxHeight) {
        height = maxHeight;
        width = height * FLOATING_ASPECT_RATIO;
      }

      const adjustedSize = adjustSizeToBounds({ width, height }, rect);
      updateFloatingVideoSize(adjustedSize);
    },
    [updateFloatingVideoSize],
  );

  const handleResizePointerUp = useCallback(() => {
    resizeStateRef.current = null;
    window.removeEventListener("pointermove", handleResizePointerMove);
    window.removeEventListener("pointerup", handleResizePointerUp);
    window.removeEventListener("pointercancel", handleResizePointerUp);
  }, [handleResizePointerMove]);

  const handleFloatingResizeStart = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!floatingVideoHost) return;
      event.preventDefault();
      event.stopPropagation();

      const rect = floatingVideoHost.getBoundingClientRect();
      floatingContainerRectRef.current = rect;

      resizeStateRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        initialWidth: floatingVideoSizeRef.current.width,
        initialHeight: floatingVideoSizeRef.current.height,
        rect,
      };

      window.addEventListener("pointermove", handleResizePointerMove);
      window.addEventListener("pointerup", handleResizePointerUp);
      window.addEventListener("pointercancel", handleResizePointerUp);
    },
    [floatingVideoHost, handleResizePointerMove, handleResizePointerUp],
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handleDragPointerMove);
      window.removeEventListener("pointerup", handleDragPointerUp);
      window.removeEventListener("pointercancel", handleDragPointerUp);
      window.removeEventListener("pointermove", handleResizePointerMove);
      window.removeEventListener("pointerup", handleResizePointerUp);
      window.removeEventListener("pointercancel", handleResizePointerUp);
    };
  }, [handleDragPointerMove, handleDragPointerUp, handleResizePointerMove, handleResizePointerUp]);

  const floatingVideoContextLabel = useMemo(() => {
    if (activeFullscreenPanel === "whiteboard") return "Whiteboard";
    if (activeFullscreenPanel === "documents") return "Document Viewer";
    if (activeFullscreenPanel === "ai") return "AI Assistant";
    return "";
  }, [activeFullscreenPanel]);

  const floatingVideoPlaceholderMessage = useMemo(
    () =>
      floatingVideoContextLabel
        ? `Video is pinned while the ${floatingVideoContextLabel} is fullscreen.`
        : "Video is pinned in fullscreen mode.",
    [floatingVideoContextLabel],
  );

  const floatingVideoOverlay = useMemo(() => {
    if (!floatingVideoHost) return null;

    return createPortal(
      <div
        style={{
          position: "absolute",
          top: `${floatingVideoPosition.y}px`,
          left: `${floatingVideoPosition.x}px`,
          width: `${floatingVideoSize.width}px`,
          height: `${floatingVideoSize.height}px`,
          zIndex: 60,
        }}
        className="group pointer-events-auto select-none"
      >
        <div className="flex h-full flex-col overflow-hidden rounded-[16px] border border-white/50 bg-black/90 text-white shadow-2xl backdrop-blur-sm">
          <div
            className="flex cursor-move items-center justify-between gap-2 bg-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            onPointerDown={handleFloatingDragStart}
            onDoubleClick={resetFloatingVideo}
          >
            <span className="flex items-center gap-1 text-white/80">
              <Move className="h-3.5 w-3.5" />
              {floatingVideoContextLabel || "Video Player"}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  resetFloatingVideo();
                }}
                className="rounded-full border border-white/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:bg-white/20"
              >
                Reset
              </button>
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  void document.exitFullscreen().catch(() => {});
                }}
                className="rounded-full border border-white/30 p-1.5 text-white/80 transition hover:bg-white/20"
                aria-label="Exit fullscreen"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="relative flex-1 overflow-hidden rounded-b-[16px] bg-black">
            <div
              ref={handleFloatingMountRef}
              className="h-full w-full"
              data-floating-video-mount
            />
            <div
              className="absolute bottom-2 right-2 h-4 w-4 cursor-se-resize rounded-full border border-white/70 bg-white/30 shadow-sm transition hover:bg-white/50"
              onPointerDown={handleFloatingResizeStart}
              role="presentation"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>,
      floatingVideoHost,
    );
  }, [
    floatingVideoContextLabel,
    floatingVideoHost,
    floatingVideoPosition.x,
    floatingVideoPosition.y,
    floatingVideoSize.height,
    floatingVideoSize.width,
    handleFloatingDragStart,
    handleFloatingResizeStart,
    handleFloatingMountRef,
    resetFloatingVideo,
  ]);

  const isFloatingVideoActive = floatingVideoHost !== null;

  return {
    floatingVideoOverlay,
    floatingVideoPlaceholderMessage,
    isFloatingVideoActive,
    activeFullscreenPanel,
    setActiveFullscreenPanel,
    resetFloatingVideo,
    floatingVideoMount,
  };
};
