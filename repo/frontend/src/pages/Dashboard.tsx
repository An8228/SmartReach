import { useEffect, useState } from "react";
import KpiCard from "../components/KpiCard";
import { fetchSummary } from "../api/analytics";
import type { AnalyticsSummary } from "../api/analytics";

export default function Dashboard() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary()
      .then(setSummary)
      .catch(() => setError("Couldn't load your metrics. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold mb-8">Key Metrics</h1>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(4)].map((_, i) => <div key={i} className="glass-card p-6 h-32 animate-pulse" />)}
        </div>
      )}

      {error && <div className="text-danger bg-danger/10 border border-danger/30 rounded-lg px-4 py-3 max-w-lg">{error}</div>}

      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <KpiCard label="Total Campaigns" sublabel="Active" value={String(summary.total_campaigns)} accent="primary" />
          <KpiCard label="Total Spend" sublabel="This Month" value={`$${summary.total_spend.toLocaleString()}`} accent="accent" />
          <KpiCard label="Total Revenue" sublabel="This Month" value={`$${summary.total_revenue.toLocaleString()}`} accent="success" />
          <KpiCard label="ROI" sublabel="This Month" value={`${summary.roi}%`} accent="primary" />
        </div>
      )}
    </div>
  );
}
