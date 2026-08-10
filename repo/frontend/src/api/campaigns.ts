import client from "./client";

export interface Campaign {
  id: number;
  name: string;
  channel: string;
  status: string;
  budget: number;
  spend: number;
  revenue: number;
  roi: number;
}

export async function fetchCampaigns(): Promise<Campaign[]> {
  const res = await client.get("/campaigns");
  return res.data;
}
