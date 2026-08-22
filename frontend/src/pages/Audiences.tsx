import { motion } from "framer-motion";
import { MOCK_AUDIENCES } from "../data/mockData";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Audiences() {
  const totalReach = MOCK_AUDIENCES.reduce((sum, a) => sum + a.size, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
        <h1 className="text-3xl font-extrabold">Audiences</h1>
        <p className="text-sm text-text-secondary">
          {MOCK_AUDIENCES.length} segments · {totalReach.toLocaleString()} people reached
        </p>
      </div>
      <p className="text-text-secondary mb-8">
        Segments built from customer behavior across your campaigns.
      </p>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {MOCK_AUDIENCES.map((a) => (
          <motion.div
            key={a.id}
            variants={item}
            whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.25)" }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="glass-card p-6"
          >
            <div className="flex items-start justify-between mb-2 gap-4">
              <h3 className="font-semibold text-lg">{a.name}</h3>
              <span
                className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
                  a.growth >= 0 ? "text-success bg-success/15" : "text-danger bg-danger/15"
                }`}
              >
                {a.growth >= 0 ? "+" : ""}{a.growth}%
              </span>
            </div>
            <p className="text-sm text-text-secondary mb-4">{a.description}</p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-xs text-text-secondary mb-1">Size</p>
                <p className="font-semibold">{a.size.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Avg. LTV</p>
                <p className="font-semibold">{a.avgLtv > 0 ? `$${a.avgLtv}` : "—"}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Top channel</p>
                <p className="font-semibold capitalize">{a.primaryChannel}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}