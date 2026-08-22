import { motion } from "framer-motion";
import { MOCK_CAMPAIGNS, MOCK_REPORT_HISTORY } from "../data/mockData";
import type { ReportHistoryItem } from "../data/mockData";

const TYPE_STYLES: Record<ReportHistoryItem["type"], string> = {
  weekly: "text-accent bg-accent/15",
  monthly: "text-primary bg-primary/15",
  campaign: "text-success bg-success/15",
  revenue: "text-warning bg-warning/15",
};

// Builds a real CSV from the current campaign data and triggers a browser download.
// No backend needed — this runs entirely client-side.
function downloadCampaignsCsv() {
  const headers = ["Name", "Channel", "Status", "Budget", "Spend", "Revenue", "ROI (%)"];
  const rows = MOCK_CAMPAIGNS.map((c) => [
    c.name,
    c.channel,
    c.status,
    c.budget,
    c.spend,
    c.revenue,
    c.roi,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `smartreach-campaigns-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function Reports() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold mb-2">Reports</h1>
      <p className="text-text-secondary mb-8">
        Export your campaign data or browse previously generated reports.
      </p>

      <div className="glass-card p-6 mb-10 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">Campaign Performance Export</h2>
          <p className="text-sm text-text-secondary">
            Download all current campaigns — budget, spend, revenue, and ROI — as a CSV file.
          </p>
        </div>
        <button
          onClick={downloadCampaignsCsv}
          className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-hover transition-colors font-semibold whitespace-nowrap"
        >
          Download CSV
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-4">Report History</h2>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        {MOCK_REPORT_HISTORY.map((r) => (
          <motion.div
            key={r.id}
            variants={item}
            className="glass-card p-4 flex items-center justify-between gap-4 flex-wrap"
          >
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${TYPE_STYLES[r.type]}`}>
                {r.type}
              </span>
              <div>
                <p className="font-medium text-sm">{r.name}</p>
                <p className="text-xs text-text-secondary">{r.period}</p>
              </div>
            </div>
            <span className="text-xs text-text-secondary">Generated {r.dateGenerated}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}