import { motion } from "framer-motion";
import { MOCK_INSIGHTS } from "../data/mockData";
import type { InsightType } from "../data/mockData";

const TYPE_STYLES: Record<InsightType, { label: string; classes: string; icon: string }> = {
  budget: { label: "Budget", classes: "text-success bg-success/15", icon: "↑" },
  risk: { label: "Risk", classes: "text-warning bg-warning/15", icon: "!" },
  forecast: { label: "Forecast", classes: "text-accent bg-accent/15", icon: "→" },
  performance: { label: "Performance", classes: "text-primary bg-primary/15", icon: "•" },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Insights() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold mb-2">AI Insights</h1>
      <p className="text-text-secondary mb-8">
        Recommendations generated from your campaign performance data.
      </p>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {MOCK_INSIGHTS.map((insight) => {
          const style = TYPE_STYLES[insight.type];
          return (
            <motion.div
              key={insight.id}
              variants={item}
              whileHover={{ scale: 1.01, borderColor: "rgba(99,102,241,0.4)" }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="glass-card p-6 flex gap-4"
            >
              <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold ${style.classes}`}>
                {style.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-1.5">
                  <h3 className="font-semibold text-base">{insight.title}</h3>
                  <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${style.classes}`}>
                    {style.label}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-3">{insight.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${insight.confidence}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                  <span className="text-xs font-medium text-text-secondary whitespace-nowrap">
                    {insight.confidence}% confidence
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}