"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const useDocumentViewer = () => {
  const documentContainerRef = useRef<HTMLDivElement | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDocumentMiniView, setIsDocumentMiniView] = useState(false);

  const handleUploadDocument = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    setPdfUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      return null;
    });

    if (file.type !== "application/pdf") {
      setUploadError("Only PDF files are supported for in-app viewing.");
      setPdfName(null);
      setIsDocumentMiniView(false);
      return;
    }

    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    setPdfName(file.name);
    setIsDocumentMiniView(false);
  }, []);

  useEffect(() => {
    return () => {
      setPdfUrl((previous) => {
        if (previous) {
          URL.revokeObjectURL(previous);
        }
        return null;
      });
    };
  }, []);

  const toggleMiniView = useCallback(() => {
    setIsDocumentMiniView((prev) => !prev);
  }, []);

  return {
    documentContainerRef,
    pdfUrl,
    pdfName,
    uploadError,
    isDocumentMiniView,
    setIsDocumentMiniView,
    handleUploadDocument,
    toggleMiniView,
  };
};
