import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Campaigns", to: "/campaigns" },
  { label: "Insights", to: "/insights" },
  { label: "Audiences", to: "/audiences" },
  { label: "Reports", to: "/reports" },
];

export default function Navbar() {
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const handleProfileClick = () => { signOut(); navigate("/login"); };
  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-extrabold tracking-tight">
          <span className="text-text-primary">SMART</span><span className="text-accent">REACH</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="px-4 py-1.5 rounded-full text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors">{link.label}</Link>
          ))}
        </nav>
        <button onClick={handleProfileClick} title={isAuthenticated ? "Sign out" : "Sign in"} className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
        </button>
      </div>
    </header>
  );
}