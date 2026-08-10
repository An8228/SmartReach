import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.detail ?? "Couldn't sign in. Check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center mb-1">Welcome back</h1>
        <p className="text-text-secondary text-center mb-8">Sign in to your SmartReach dashboard</p>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
          {error && <div className="text-sm text-danger bg-danger/10 border border-danger/30 rounded-lg px-3 py-2">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-hover transition-colors font-semibold disabled:opacity-60">
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-text-secondary mt-6">
          Don't have an account? <Link to="/register" className="text-accent hover:underline">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}
