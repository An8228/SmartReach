from pydantic import BaseModel

class CampaignOut(BaseModel):
    id: int
    name: str
    channel: str
    status: str
    budget: float
    spend: float
    revenue: float
    roi: float
