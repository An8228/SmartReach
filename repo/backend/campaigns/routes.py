from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.models.campaign import Campaign
from backend.auth.dependencies import get_current_user
from backend.campaigns.schemas import CampaignOut

router = APIRouter(prefix="/campaigns", tags=["Campaigns"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("", response_model=List[CampaignOut])
def list_campaigns(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    campaigns = db.query(Campaign).all()
    return [
        CampaignOut(id=c.id, name=c.name, channel=c.channel, status=c.status,
                    budget=c.budget, spend=c.spend, revenue=c.revenue, roi=c.roi)
        for c in campaigns
    ]
