import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FEATURES = ["Real-time analytics", "Exportable reports", "Interactive visualizations", "AI recommendations"];
const MARQUEE_ITEMS = [...FEATURES, ...FEATURES];

export default function Landing() {
  const { enterDemo } = useAuth();
  const navigate = useNavigate();

  const handleLiveDemo = () => {
    enterDemo();
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-background">
      <div className="pointer-events-none absolute -top-32 -right-32 w-[36rem] h-[36rem] bg-primary/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Measure, Optimize, and Grow <span className="gradient-text">Every Marketing Campaign</span>
        </h1>
        <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
          Gain complete visibility into campaign performance, customer acquisition, revenue, and ROI
          through a powerful analytics platform built for marketing professionals. Turn complex data
          into clear, actionable insights in real time.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={handleLiveDemo}
            className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover transition-colors font-semibold shadow-lg shadow-primary/30"
          >
            View Live Demo
          </button>
          <Link to="/register" className="px-6 py-3 rounded-xl border border-white/15 hover:bg-white/5 transition-colors font-semibold">
            Explore Dashboard
          </Link>
        </div>
        <p className="mt-4 text-xs text-text-secondary">
          No account needed — the live demo uses sample data.
        </p>
      </div>

      <div className="relative border-t border-white/5 mt-12 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee py-6">
          {MARQUEE_ITEMS.map((f, i) => (
            <span key={i} className="flex items-center text-xs uppercase tracking-widest text-text-secondary mx-8">
              {f}
              <span className="text-white/20 ml-8">—</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}