// src/data/mockData.ts
// Static sample data used in Demo Mode, so the app is fully explorable
// without a backend or an account.

export const MOCK_SUMMARY = {
  total_campaigns: 5,
  total_spend: 31030,
  total_revenue: 60000,
  roi: 93.4,
};

export const MOCK_CAMPAIGNS = [
  { id: 1, name: "Summer Sale Email Blast", channel: "email", status: "active", budget: 10000, spend: 6200, revenue: 15400, roi: 148.4 },
  { id: 2, name: "Instagram Brand Awareness", channel: "social", status: "active", budget: 8000, spend: 7100, revenue: 9800, roi: 38.0 },
  { id: 3, name: "Google Search - Fintech Keywords", channel: "search", status: "active", budget: 12000, spend: 11800, revenue: 26500, roi: 124.6 },
  { id: 4, name: "Retargeting - Cart Abandoners", channel: "display", status: "paused", budget: 4000, spend: 3950, revenue: 5200, roi: 31.6 },
  { id: 5, name: "SMS Flash Promo", channel: "sms", status: "completed", budget: 2000, spend: 1980, revenue: 3100, roi: 56.6 },
];
