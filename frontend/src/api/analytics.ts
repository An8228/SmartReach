import client from "./client";

export interface AnalyticsSummary {
  total_campaigns: number;
  total_spend: number;
  total_revenue: number;
  roi: number;
}

export async function fetchSummary(): Promise<AnalyticsSummary> {
  const res = await client.get("/analytics/summary");
  return res.data;
}
