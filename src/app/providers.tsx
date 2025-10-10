"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { WhiteboardProvider } from "@/contexts/WhiteboardContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WhiteboardProvider>{children}</WhiteboardProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
