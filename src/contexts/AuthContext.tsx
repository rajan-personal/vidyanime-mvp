"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface Principal {
  id: string;
  name: string;
  email: string;
  schoolId: string;
}

interface AuthContextType {
  currentUser: Principal | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Principal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = typeof window !== "undefined" ? localStorage.getItem("vidyanime_user") : null;
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("vidyanime_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (email === "admin@dpsnoida.edu.in" && password === "VidyanimeSecure2024!") {
        const user: Principal = {
          id: "1",
          name: "Dr. Rajesh Kumar",
          email: "admin@dpsnoida.edu.in",
          schoolId: "1",
        };
        setCurrentUser(user);
        if (typeof window !== "undefined") {
          localStorage.setItem("vidyanime_user", JSON.stringify(user));
        }
      } else {
        throw new Error("Invalid credentials. Please check your email and password.");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("vidyanime_user");
    }
  };

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      login,
      logout,
    }),
    [currentUser, loading]
  );

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
