"use client";

import { type MutableRefObject, type PointerEvent } from "react";

import { Maximize2, Minimize2 } from "lucide-react";

import { whiteboardPalette } from "./constants";

interface WhiteboardPanelProps {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  color: string;
  onColorChange: (color: string) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onClear: () => void;
  handlePointerDown: (event: PointerEvent<HTMLCanvasElement>) => void;
  handlePointerMove: (event: PointerEvent<HTMLCanvasElement>) => void;
  handlePointerUp: (event: PointerEvent<HTMLCanvasElement>) => void;
}

export const WhiteboardPanel = ({
  containerRef,
  canvasRef,
  color,
  onColorChange,
  isFullscreen,
  onToggleFullscreen,
  onClear,
  handlePointerDown,
  handlePointerMove,
  handlePointerUp,
}: WhiteboardPanelProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-3">
        <div className="flex items-center gap-2">
          {whiteboardPalette.map((paletteColor) => (
            <button
              key={paletteColor}
              style={{ backgroundColor: paletteColor }}
              className={`h-6 w-6 rounded-full border border-white shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1357C6] ${
                color === paletteColor ? "ring-2 ring-[#1357C6]" : ""
              }`}
              aria-label={`Switch to ${paletteColor} ink`}
              onClick={() => onColorChange(paletteColor)}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            className="rounded-full border border-[#D9D9D9] px-3 py-1 text-xs text-[#4E4E4E] transition hover:border-[#1357C6] hover:text-[#1357C6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1357C6]"
          >
            Clear
          </button>
          <button
            onClick={onToggleFullscreen}
            className="rounded-full border border-[#D9D9D9] p-2 text-[#4E4E4E] transition hover:border-[#1357C6] hover:text-[#1357C6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1357C6]"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div ref={containerRef} className="relative flex-1 bg-[#F8FAFC]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      </div>
    </div>
  );
};
