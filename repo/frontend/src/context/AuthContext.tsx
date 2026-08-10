import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { login as apiLogin, register as apiRegister } from "../api/auth";

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("smartreach_token"));

  const signIn = async (email: string, password: string) => {
    const data = await apiLogin(email, password);
    localStorage.setItem("smartreach_token", data.access_token);
    setToken(data.access_token);
  };

  const signUp = async (email: string, password: string) => {
    const data = await apiRegister(email, password);
    localStorage.setItem("smartreach_token", data.access_token);
    setToken(data.access_token);
  };

  const signOut = () => {
    localStorage.removeItem("smartreach_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
