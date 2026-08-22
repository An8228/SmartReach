import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCampaigns } from "../api/campaigns";
import type { Campaign } from "../api/campaigns";
import { useAuth } from "../context/AuthContext";
import { MOCK_CAMPAIGNS } from "../data/mockData";

const STATUS_CLASSES: Record<string, string> = {
  active: "text-success bg-success/15",
  paused: "text-warning bg-warning/15",
  completed: "text-text-secondary bg-white/10",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Campaigns() {
  const { isDemo } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    if (isDemo) {
      setCampaigns(MOCK_CAMPAIGNS);
      setLoading(false);
      return;
    }
    fetchCampaigns()
      .then(setCampaigns)
      .catch(() => setError("Couldn't load campaigns. Is the backend running?"))
      .finally(() => setLoading(false));
  }, [isDemo]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-extrabold">Campaigns</h1>
        {isDemo && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-warning/15 text-warning">
            Demo Mode — sample data
          </span>
        )}
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <div key={i} className="glass-card p-6 h-40 animate-pulse" />)}
        </div>
      )}

      {error && <div className="text-danger bg-danger/10 border border-danger/30 rounded-lg px-4 py-3 max-w-lg">{error}</div>}

      {!loading && !error && campaigns.length === 0 && <p className="text-text-secondary">No campaigns yet.</p>}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {campaigns.map((c) => {
          const isOpen = openId === c.id;
          return (
            <motion.div
              key={c.id}
              variants={item}
              whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.25)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="glass-card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{c.name}</h3>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_CLASSES[c.status] ?? "bg-white/10 text-text-secondary"}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">
                  Budget: <span className="text-text-primary font-medium">${c.budget.toLocaleString()}</span>
                </p>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="mt-4 pt-4 border-t border-white/10 space-y-1.5 text-sm overflow-hidden"
                    >
                      <p className="text-text-secondary">Channel: <span className="text-text-primary capitalize">{c.channel}</span></p>
                      <p className="text-text-secondary">Spend: <span className="text-text-primary">${c.spend.toLocaleString()}</span></p>
                      <p className="text-text-secondary">Revenue: <span className="text-text-primary">${c.revenue.toLocaleString()}</span></p>
                      <p className="text-text-secondary">ROI: <span className="text-success font-medium">{c.roi}%</span></p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button onClick={() => setOpenId(isOpen ? null : c.id)}
                className="mt-4 self-start px-4 py-1.5 rounded-full text-sm font-medium bg-primary/15 text-primary hover:bg-primary/25 transition-colors">
                {isOpen ? "Hide Details" : "Check Details"}
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}