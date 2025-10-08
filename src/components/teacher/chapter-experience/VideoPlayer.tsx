"use client";

import "video.js/dist/video-js.css";

import { useCallback, useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";

import type { ChapterDetails } from "@/data/teacherChapters";

import type { PlaybackState } from "./types";
import { clamp } from "./utils";

const PLAYER_EVENTS = ["timeupdate", "play", "pause", "seeking", "seeked", "ratechange", "volumechange"] as const;

export interface VideoPlayerProps {
  chapter: ChapterDetails;
  mountNode: HTMLElement | null;
  placeholderClassName?: string;
  videoClassName?: string;
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  playbackStateRef: MutableRefObject<PlaybackState>;
}

export const VideoPlayer = ({
  chapter,
  mountNode,
  placeholderClassName,
  videoClassName,
  videoRef,
  playbackStateRef,
}: VideoPlayerProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const techElementRef = useRef<HTMLVideoElement | null>(null);
  const appliedVideoClassesRef = useRef<string[]>([]);
  const latestVideoClassListRef = useRef<string[]>([]);
  const previousMountRef = useRef<HTMLElement | null>(null);
  const refreshTechRef = useRef<(() => void) | null>(null);
  const updatePlaybackStateHandlerRef = useRef<(() => void) | null>(null);
  const applyPlaybackStateHandlerRef = useRef<(() => void) | null>(null);
  const lastInitializedSlugRef = useRef<string | null>(null);

  const videoClassList = useMemo(() => videoClassName?.split(/\s+/).filter(Boolean) ?? [], [videoClassName]);
  const wrapperClassName = useMemo(() => {
    const base = ["h-full", "w-full"];
    if (placeholderClassName) {
      base.push(placeholderClassName);
    }
    return base.join(" ");
  }, [placeholderClassName]);

  const streamSource = useMemo(() => {
    const stream = chapter.videoStreamUrl?.trim();
    const fallback = chapter.videoUrl?.trim() ?? "";
    return stream && stream.length > 0 ? stream : fallback;
  }, [chapter.videoStreamUrl, chapter.videoUrl]);

  const sourceType = useMemo(
    () => (/\.m3u8(\?.*)?$/i.test(streamSource) ? "application/x-mpegURL" : "video/mp4"),
    [streamSource],
  );

  const applyVideoClasses = useCallback(() => {
    const tech = techElementRef.current;
    if (!tech) return;

    const previouslyApplied = appliedVideoClassesRef.current;
    previouslyApplied.forEach((className) => {
      tech.classList.remove(className);
    });

    const latest = latestVideoClassListRef.current;
    latest.forEach((className) => {
      tech.classList.add(className);
    });

    appliedVideoClassesRef.current = [...latest];
  }, []);

  useEffect(() => {
    latestVideoClassListRef.current = videoClassList;
    applyVideoClasses();
  }, [applyVideoClasses, videoClassList]);

  useEffect(() => {
    if (playerRef.current) {
      return;
    }

  const wrapper = document.createElement("div");
  wrapper.setAttribute("data-vjs-player", "");
  wrapper.className = "h-full w-full";
    wrapperRef.current = wrapper;

    const videoElement = document.createElement("video-js") as HTMLVideoElement;
    videoElement.className = "video-js vjs-big-play-centered";
    videoElement.setAttribute("playsinline", "");
    videoElement.setAttribute("preload", "metadata");
    videoElement.setAttribute("crossorigin", "anonymous");
    videoElement.style.width = "100%";
    videoElement.style.height = "100%";
    videoElement.style.backgroundColor = "transparent";
    wrapper.appendChild(videoElement);
    videoElementRef.current = videoElement;

    const player = videojs(videoElement, {
      controls: true,
      autoplay: false,
      preload: "metadata",
      fill: true,
      html5: {
        vhs: {
          overrideNative: true,
        },
      },
    });

    playerRef.current = player;

    const refreshTech = () => {
      const tech = player.el()?.getElementsByTagName("video")[0] ?? null;
      techElementRef.current = tech;
      videoRef.current = tech;
      applyVideoClasses();
    };

    refreshTechRef.current = refreshTech;
    refreshTech();

    const updatePlaybackState = () => {
      playbackStateRef.current = {
        currentTime: player.currentTime() ?? 0,
        wasPlaying: !player.paused(),
        volume: player.muted() ? 0 : player.volume() ?? 1,
        playbackRate: player.playbackRate() ?? 1,
        muted: player.muted() ?? false,
      };
    };

    updatePlaybackStateHandlerRef.current = updatePlaybackState;

    PLAYER_EVENTS.forEach((eventName) => player.on(eventName, updatePlaybackState));
    updatePlaybackState();

    const applyPlaybackState = () => {
      const state = playbackStateRef.current;

      if (!Number.isNaN(state.volume)) {
        player.volume(clamp(state.volume, 0, 1));
      }

      player.muted(state.muted);

      if (!Number.isNaN(state.playbackRate) && state.playbackRate > 0) {
        player.playbackRate(state.playbackRate);
      }

      if (state.currentTime > 0) {
        const duration = player.duration();
        if (typeof duration === "number" && Number.isFinite(duration) && duration > 0) {
          const safeTime = Math.min(state.currentTime, Math.max(duration - 0.1, 0));
          player.currentTime(safeTime);
        } else {
          player.currentTime(state.currentTime);
        }
      } else {
        player.currentTime(0);
      }

      if (state.wasPlaying) {
        const playPromise = player.play();
        if (playPromise) {
          void playPromise.catch(() => {});
        }
      } else {
        player.pause();
      }
    };

    applyPlaybackStateHandlerRef.current = applyPlaybackState;

    if (player.readyState() >= 1) {
      applyPlaybackState();
    } else {
      player.one("loadedmetadata", applyPlaybackState);
    }

    return () => {
      const updateHandler = updatePlaybackStateHandlerRef.current;
      PLAYER_EVENTS.forEach((eventName) => {
        if (updateHandler) {
          player.off(eventName, updateHandler);
        } else {
          player.off(eventName);
        }
      });

      const applyHandler = applyPlaybackStateHandlerRef.current;
      if (applyHandler) {
        player.off("loadedmetadata", applyHandler);
      }

      updatePlaybackStateHandlerRef.current?.();

      if (!player.isDisposed()) {
        player.dispose();
      }

      const wrapperElement = wrapperRef.current;
      const previousMount = previousMountRef.current;
      if (previousMount && wrapperElement && previousMount.contains(wrapperElement)) {
        previousMount.removeChild(wrapperElement);
      }

      if (wrapperElement) {
        while (wrapperElement.firstChild) {
          wrapperElement.removeChild(wrapperElement.firstChild);
        }
      }

      playerRef.current = null;
      videoElementRef.current = null;
      techElementRef.current = null;
      appliedVideoClassesRef.current = [];
      latestVideoClassListRef.current = [];
      previousMountRef.current = null;
      refreshTechRef.current = null;
      updatePlaybackStateHandlerRef.current = null;
      applyPlaybackStateHandlerRef.current = null;
      videoRef.current = null;
    };
  }, [applyVideoClasses, playbackStateRef, videoRef]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.className = wrapperClassName;
    }
  }, [wrapperClassName]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const previousMount = previousMountRef.current;

    if (mountNode && wrapper.parentElement !== mountNode) {
      if (previousMount && previousMount.contains(wrapper)) {
        previousMount.removeChild(wrapper);
      }

      mountNode.appendChild(wrapper);
      previousMountRef.current = mountNode;
      refreshTechRef.current?.();
      applyVideoClasses();
      const player = playerRef.current;
      if (player) {
        player.trigger("playerresize");
        applyPlaybackStateHandlerRef.current?.();
        const state = playbackStateRef.current;
        if (state.wasPlaying) {
          const playPromise = player.play();
          if (playPromise) {
            void playPromise.catch(() => {});
          }
        }
      }
    } else if (!mountNode && previousMount && previousMount.contains(wrapper)) {
      previousMount.removeChild(wrapper);
      previousMountRef.current = null;
    }
  }, [applyVideoClasses, mountNode, playbackStateRef]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    if (chapter.videoPoster) {
      player.poster(chapter.videoPoster);
    } else {
      player.poster("");
    }

    const currentSource = player.currentSource() as { src?: string; type?: string } | undefined;
    const nextSource = { src: streamSource, type: sourceType };
    const sourceChanged = !currentSource || currentSource.src !== nextSource.src || currentSource.type !== nextSource.type;

    if (sourceChanged) {
      player.src(nextSource);
      player.load();
      refreshTechRef.current?.();

      const reapplyPlayback = () => {
        applyPlaybackStateHandlerRef.current?.();
      };

      if (player.readyState() >= 1) {
        reapplyPlayback();
      } else {
        player.one("loadedmetadata", reapplyPlayback);
      }
    }
  }, [chapter.videoPoster, sourceType, streamSource]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const reapply = () => {
      applyPlaybackStateHandlerRef.current?.();
    };

    if (player.readyState() >= 1) {
      reapply();
    } else {
      player.one("loadedmetadata", reapply);
      return () => {
        player.off("loadedmetadata", reapply);
      };
    }
  }, [chapter.slug]);

  useEffect(() => {
    if (lastInitializedSlugRef.current === chapter.slug) {
      return;
    }

    lastInitializedSlugRef.current = chapter.slug;
    playbackStateRef.current = {
      currentTime: 0,
      wasPlaying: false,
      volume: 1,
      playbackRate: 1,
      muted: false,
    };
  }, [chapter.slug, playbackStateRef]);

  return null;
};
