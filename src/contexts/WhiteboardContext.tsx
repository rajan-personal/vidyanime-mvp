"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Annotation {
  id: string;
  paths: { x: number; y: number }[];
  color: string;
  width: number;
}

interface WhiteboardPage {
  id: string;
  annotations: Annotation[];
}

interface WhiteboardState {
  chapterId: string;
  pages: WhiteboardPage[];
  currentPageIndex: number;
}

interface WhiteboardContextType {
  whiteboards: Record<string, WhiteboardState>;
  currentColor: string;
  currentWidth: number;
  setCurrentColor: (color: string) => void;
  setCurrentWidth: (width: number) => void;
  addAnnotation: (chapterId: string, annotation: Omit<Annotation, "id">) => void;
  addPage: (chapterId: string) => void;
  setCurrentPage: (chapterId: string, pageIndex: number) => void;
  getCurrentWhiteboard: (chapterId: string) => WhiteboardState;
}

const WhiteboardContext = createContext<WhiteboardContextType | undefined>(undefined);

export function useWhiteboard() {
  const context = useContext(WhiteboardContext);
  if (!context) {
    throw new Error("useWhiteboard must be used within a WhiteboardProvider");
  }
  return context;
}

const STORAGE_KEY = "vidyanime_whiteboards";

export function WhiteboardProvider({ children }: { children: React.ReactNode }) {
  const [whiteboards, setWhiteboards] = useState<Record<string, WhiteboardState>>({});
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentWidth, setCurrentWidth] = useState(3);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const savedWhiteboards = window.localStorage.getItem(STORAGE_KEY);
    if (savedWhiteboards) {
      try {
        setWhiteboards(JSON.parse(savedWhiteboards));
      } catch (error) {
        console.error("Failed to parse saved whiteboards", error);
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (Object.keys(whiteboards).length > 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(whiteboards));
    }
  }, [whiteboards]);

  const getCurrentWhiteboard = useCallback(
    (chapterId: string): WhiteboardState => {
      const existing = whiteboards[chapterId];
      if (existing) {
        return existing;
      }

      return {
        chapterId,
        pages: [
          {
            id: uuidv4(),
            annotations: [],
          },
        ],
        currentPageIndex: 0,
      };
    },
    [whiteboards]
  );

  const addAnnotation = useCallback((chapterId: string, annotationData: Omit<Annotation, "id">) => {
    setWhiteboards((prev) => {
      const whiteboard = prev[chapterId] ?? getCurrentWhiteboard(chapterId);
      const updatedPages = [...whiteboard.pages];
      const currentPage = updatedPages[whiteboard.currentPageIndex] ?? {
        id: uuidv4(),
        annotations: [],
      };

      updatedPages[whiteboard.currentPageIndex] = {
        ...currentPage,
        annotations: [
          ...currentPage.annotations,
          {
            ...annotationData,
            id: uuidv4(),
          },
        ],
      };

      return {
        ...prev,
        [chapterId]: {
          ...whiteboard,
          pages: updatedPages,
        },
      };
    });
  }, [getCurrentWhiteboard]);

  const addPage = useCallback((chapterId: string) => {
    setWhiteboards((prev) => {
      const whiteboard = prev[chapterId] ?? getCurrentWhiteboard(chapterId);

      return {
        ...prev,
        [chapterId]: {
          ...whiteboard,
          pages: [
            ...whiteboard.pages,
            {
              id: uuidv4(),
              annotations: [],
            },
          ],
          currentPageIndex: whiteboard.pages.length,
        },
      };
    });
  }, [getCurrentWhiteboard]);

  const setCurrentPage = useCallback((chapterId: string, pageIndex: number) => {
    setWhiteboards((prev) => {
      const whiteboard = prev[chapterId] ?? getCurrentWhiteboard(chapterId);
      if (pageIndex < 0 || pageIndex >= whiteboard.pages.length) {
        return prev;
      }

      return {
        ...prev,
        [chapterId]: {
          ...whiteboard,
          currentPageIndex: pageIndex,
        },
      };
    });
  }, [getCurrentWhiteboard]);

  const value = useMemo(
    () => ({
      whiteboards,
      currentColor,
      currentWidth,
      setCurrentColor,
      setCurrentWidth,
      addAnnotation,
      addPage,
      setCurrentPage,
      getCurrentWhiteboard,
    }),
    [
      addAnnotation,
      addPage,
      currentColor,
      currentWidth,
      getCurrentWhiteboard,
      setCurrentColor,
      setCurrentWidth,
      setCurrentPage,
      whiteboards,
    ]
  );

  return <WhiteboardContext.Provider value={value}>{children}</WhiteboardContext.Provider>;
}
