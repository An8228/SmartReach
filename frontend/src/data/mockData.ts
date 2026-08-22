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


export type InsightType = "budget" | "risk" | "forecast" | "performance";

export interface AiInsight {
  id: number;
  type: InsightType;
  title: string;
  description: string;
  confidence: number;
}

export const MOCK_INSIGHTS: AiInsight[] = [
  {
    id: 1,
    type: "budget",
    title: "Increase budget for Google Search - Fintech Keywords",
    description: "This campaign is converting at 2.2x your average ROI. Shifting an extra $2,000 from lower performers could add an estimated $4,300 in revenue this month.",
    confidence: 87,
  },
  {
    id: 2,
    type: "risk",
    title: "Reduce spend on Retargeting - Cart Abandoners",
    description: "Spend is nearly matching budget while ROI trails the rest of your active campaigns. Consider pausing or reworking the creative before renewing.",
    confidence: 74,
  },
  {
    id: 3,
    type: "forecast",
    title: "Forecast: next month's revenue",
    description: "Based on current campaign trajectories, projected revenue for next month is $64,000–$71,000, a 6-9% increase over this month.",
    confidence: 68,
  },
  {
    id: 4,
    type: "performance",
    title: "Instagram Brand Awareness is underperforming",
    description: "Engagement is 18% below your other social campaigns over the last two weeks. Refreshing ad creative typically recovers 10-15% of lost engagement.",
    confidence: 79,
  },
  {
    id: 5,
    type: "forecast",
    title: "Predict campaign performance: SMS Flash Promo",
    description: "Based on similar past campaigns, a repeat SMS promo run next quarter is projected to convert at a similar 56% ROI.",
    confidence: 71,
  },
];


export interface AudienceSegment {
  id: number;
  name: string;
  description: string;
  size: number;
  avgLtv: number;
  growth: number;
  primaryChannel: string;
}

export const MOCK_AUDIENCES: AudienceSegment[] = [
  {
    id: 1,
    name: "High-Value Repeat Buyers",
    description: "Customers with 3+ purchases and above-average order value over the last 6 months.",
    size: 2140,
    avgLtv: 486,
    growth: 12.4,
    primaryChannel: "email",
  },
  {
    id: 2,
    name: "Cart Abandoners",
    description: "Added items to cart in the last 30 days but did not complete checkout.",
    size: 5320,
    avgLtv: 0,
    growth: -3.1,
    primaryChannel: "display",
  },
  {
    id: 3,
    name: "Newsletter Subscribers",
    description: "Opted in to marketing emails but haven't made a first purchase yet.",
    size: 8760,
    avgLtv: 62,
    growth: 8.9,
    primaryChannel: "email",
  },
  {
    id: 4,
    name: "Social Media Followers",
    description: "Engaged with Instagram or brand content in the last 90 days.",
    size: 14200,
    avgLtv: 41,
    growth: 15.7,
    primaryChannel: "social",
  },
  {
    id: 5,
    name: "First-Time Visitors",
    description: "New site visitors in the last 14 days with no prior account history.",
    size: 3980,
    avgLtv: 0,
    growth: 22.3,
    primaryChannel: "search",
  },
];

export interface ReportHistoryItem {
  id: number;
  name: string;
  type: "weekly" | "monthly" | "campaign" | "revenue";
  dateGenerated: string;
  period: string;
}

export const MOCK_REPORT_HISTORY: ReportHistoryItem[] = [
  { id: 1, name: "Weekly Performance Summary", type: "weekly", dateGenerated: "2026-08-17", period: "Aug 10 - Aug 16, 2026" },
  { id: 2, name: "Monthly Revenue Report", type: "revenue", dateGenerated: "2026-08-01", period: "July 2026" },
  { id: 3, name: "Campaign Performance Breakdown", type: "campaign", dateGenerated: "2026-07-28", period: "Q2 2026" },
  { id: 4, name: "Weekly Performance Summary", type: "weekly", dateGenerated: "2026-08-10", period: "Aug 3 - Aug 9, 2026" },
];