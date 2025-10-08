"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { whiteboardPalette } from "./constants";

const DEFAULT_COLOR = whiteboardPalette[1];

type Point = {
  x: number;
  y: number;
};

export const useWhiteboardCanvas = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastPointRef = useRef<Point | null>(null);
  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ratio = window.devicePixelRatio || 1;
    const { clientWidth, clientHeight } = container;

    let snapshot: { dataUrl: string; width: number; height: number } | null = null;
    if (canvas.width > 0 && canvas.height > 0) {
      try {
        const previousWidth = canvas.width / ratio;
        const previousHeight = canvas.height / ratio;
        snapshot = {
          dataUrl: canvas.toDataURL(),
          width: previousWidth,
          height: previousHeight,
        };
      } catch (error) {
        console.error("Failed to capture whiteboard snapshot before resize", error);
        snapshot = null;
      }
    }

    canvas.width = clientWidth * ratio;
    canvas.height = clientHeight * ratio;
    canvas.style.width = `${clientWidth}px`;
    canvas.style.height = `${clientHeight}px`;

    const context = canvas.getContext("2d");
    if (!context) return;

    const configureContext = () => {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = 4;
      context.strokeStyle = color;
    };

    configureContext();

    if (snapshot && typeof window !== "undefined") {
      const snapshotImage = new window.Image();
      snapshotImage.onload = () => {
  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

        const previousWidth = snapshot.width ?? clientWidth;
        const previousHeight = snapshot.height ?? clientHeight;
  const scale = Math.min(clientWidth / previousWidth, clientHeight / previousHeight);
  const drawWidth = previousWidth * scale;
  const drawHeight = previousHeight * scale;
  const offsetX = (clientWidth - drawWidth) / 2;
  const offsetY = (clientHeight - drawHeight) / 2;

  const sourceWidth = snapshotImage.naturalWidth || snapshotImage.width;
  const sourceHeight = snapshotImage.naturalHeight || snapshotImage.height;
  const destX = offsetX * ratio;
  const destY = offsetY * ratio;
  const destWidth = drawWidth * ratio;
  const destHeight = drawHeight * ratio;

  context.drawImage(snapshotImage, 0, 0, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
        context.restore();
        configureContext();
      };
      snapshotImage.src = snapshot.dataUrl;
    }
  }, [color]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  const drawLine = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (!lastPointRef.current) {
        lastPointRef.current = { x, y };
        return;
      }

      context.strokeStyle = color;
      context.beginPath();
      context.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      context.lineTo(x, y);
      context.stroke();

      lastPointRef.current = { x, y };
    },
    [color],
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      event.preventDefault();
      (event.target as HTMLCanvasElement).setPointerCapture(event.pointerId);
      lastPointRef.current = null;
      drawLine(event);
    },
    [drawLine],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      event.preventDefault();
      if (event.buttons !== 1) return;
      drawLine(event);
    },
    [drawLine],
  );

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    (event.target as HTMLCanvasElement).releasePointerCapture(event.pointerId);
    lastPointRef.current = null;
  }, []);

  const handleClear = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  return {
    containerRef,
    canvasRef,
    color,
    setColor,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleClear,
    resizeCanvas,
  };
};
