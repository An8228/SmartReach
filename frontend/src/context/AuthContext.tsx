import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { login as apiLogin, register as apiRegister } from "../api/auth";

interface AuthContextValue {
  token: string | null;
  isDemo: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  enterDemo: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("smartreach_token"));
  const [isDemo, setIsDemo] = useState<boolean>(localStorage.getItem("smartreach_demo") === "true");

  const signIn = async (email: string, password: string) => {
    const data = await apiLogin(email, password);
    localStorage.setItem("smartreach_token", data.access_token);
    localStorage.removeItem("smartreach_demo");
    setIsDemo(false);
    setToken(data.access_token);
  };

  const signUp = async (email: string, password: string) => {
    const data = await apiRegister(email, password);
    localStorage.setItem("smartreach_token", data.access_token);
    localStorage.removeItem("smartreach_demo");
    setIsDemo(false);
    setToken(data.access_token);
  };

  const enterDemo = () => {
    localStorage.setItem("smartreach_demo", "true");
    setIsDemo(true);
  };

  const signOut = () => {
    localStorage.removeItem("smartreach_token");
    localStorage.removeItem("smartreach_demo");
    setToken(null);
    setIsDemo(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, isDemo, isAuthenticated: !!token || isDemo, signIn, signUp, enterDemo, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}