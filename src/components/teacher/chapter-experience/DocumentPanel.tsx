"use client";

import { type ChangeEvent, type MutableRefObject } from "react";

import { Download, Maximize2, Minimize2, Upload } from "lucide-react";

interface DocumentPanelProps {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  pdfUrl: string | null;
  pdfName: string | null;
  uploadError: string | null;
  isMiniView: boolean;
  onToggleMiniView: () => void;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const DocumentPanel = ({
  containerRef,
  pdfUrl,
  pdfName,
  uploadError,
  isMiniView,
  onToggleMiniView,
  onUpload,
  isFullscreen,
  onToggleFullscreen,
}: DocumentPanelProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between border-b border-[#E5E7EB] px-5 py-4">
        <div>
          <h3 className="text-lg font-semibold text-[#1357C6]">Document Viewer</h3>
          <p className="text-sm text-[#6F7787]">Upload lesson plans or worksheets in PDF format.</p>
        </div>
        <button
          onClick={onToggleFullscreen}
          disabled={!pdfUrl}
          className="rounded-full border border-[#D9D9D9] p-2 text-[#4E4E4E] transition hover:border-[#1357C6] hover:text-[#1357C6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1357C6] disabled:cursor-not-allowed disabled:opacity-60"
          aria-label={isFullscreen ? "Exit document fullscreen" : "Enter document fullscreen"}
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <label className="flex flex-col items-center justify-center gap-3 rounded-[16px] border border-dashed border-[#1357C6] bg-[#F0F5FF] p-6 text-center">
          <Upload className="h-6 w-6 text-[#1357C6]" />
          <div>
            <p className="text-sm font-semibold text-[#1357C6]">Drop your PDF here or click to browse</p>
            <p className="text-xs text-[#6F7787]">Only PDF files are supported for preview.</p>
          </div>
          <input type="file" accept="application/pdf" onChange={onUpload} className="hidden" />
        </label>
        {uploadError ? (
          <p className="rounded-[12px] bg-[#FEE2E2] px-4 py-2 text-sm text-[#B91C1C]">{uploadError}</p>
        ) : null}
        {pdfUrl ? (
          <div
            ref={containerRef}
            className={`relative flex h-full flex-col overflow-hidden rounded-[16px] border border-[#D9D9D9] ${
              isFullscreen ? "bg-[#EAF1FF]" : "bg-white"
            }`}
          >
            <div className="flex items-start justify-between border-b border-[#D9D9D9] bg-[#F8FAFF] px-4 py-2 text-sm text-[#4E4E4E]">
              <span className="flex items-center gap-2">
                <Download className="h-4 w-4 text-[#1357C6]" />
                {pdfName}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onToggleMiniView}
                  disabled={!isFullscreen}
                  aria-disabled={!isFullscreen}
                  title={
                    !isFullscreen
                      ? "Enter fullscreen to enable mini view"
                      : isMiniView
                        ? "Return to full document view"
                        : "Shrink document while staying in fullscreen"
                  }
                  className="rounded-full border border-[#D9D9D9] px-3 py-1 text-xs font-medium text-[#4E4E4E] transition hover:border-[#1357C6] hover:text-[#1357C6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1357C6] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isMiniView ? "Fill view" : "Mini view"}
                </button>
                <a
                  href={pdfUrl}
                  download={pdfName ?? "chapter-document.pdf"}
                  className="rounded-full border border-[#D9D9D9] px-3 py-1 text-xs font-medium text-[#1357C6] transition hover:border-[#1357C6] hover:bg-[#1357C6] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1357C6]"
                >
                  Save copy
                </a>
                <button
                  onClick={onToggleFullscreen}
                  className="rounded-full border border-[#D9D9D9] p-2 text-[#4E4E4E] transition hover:border-[#1357C6] hover:text-[#1357C6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1357C6]"
                  aria-label={isFullscreen ? "Exit document fullscreen" : "Enter document fullscreen"}
                  title={
                    isFullscreen
                      ? "Return document viewer to embedded layout"
                      : "Expand document viewer to fullscreen"
                  }
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className={`flex-1 overflow-hidden ${isFullscreen && isMiniView ? "flex items-center justify-center p-4 sm:p-6" : ""}`}>
              <iframe
                src={pdfUrl}
                className={
                  isFullscreen && isMiniView
                    ? "h-[80vh] w-full max-w-[720px] rounded-[20px] border border-[#D9D9D9] bg-white shadow-2xl"
                    : "h-full w-full"
                }
                title="Uploaded Document Preview"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-[16px] border border-dashed border-[#D9D9D9] bg-[#FCFCFD] p-6 text-center text-sm text-[#6F7787]">
            Upload a PDF to preview it directly inside your dashboard.
          </div>
        )}
      </div>
    </div>
  );
};
