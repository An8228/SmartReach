from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.analytics.schemas import CampaignAnalyticsResponse
from backend.auth.dependencies import get_current_user, require_role
from backend.database import SessionLocal
from backend.models.campaign import Campaign
from backend.data_pipeline.raw_events import RawEventStore
from backend.data_pipeline.aggregator import AnalyticsAggregator
from backend.data_pipeline.seed_events import seed_events
from backend.privacy.safe_response import build_safe_analytics_response

router = APIRouter(prefix="/analytics", tags=["Analytics"])

event_store = RawEventStore()
seed_events(event_store)
aggregator = AnalyticsAggregator(event_store)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/campaigns")
def get_campaign_analytics(current_user=Depends(require_role(["admin", "manager", "analyst"]))):
    raw_metrics = aggregator.build_campaign_analytics()
    safe_metrics = {}
    for campaign_id, metrics in raw_metrics.items():
        safe_metrics[campaign_id] = build_safe_analytics_response(raw_data=metrics, role=current_user.role)
    return {"campaigns": safe_metrics}

@router.get("/summary")
def get_summary(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    campaigns = db.query(Campaign).all()
    total_campaigns = len(campaigns)
    total_spend = sum(c.spend for c in campaigns)
    total_revenue = sum(c.revenue for c in campaigns)
    roi = round(((total_revenue - total_spend) / total_spend) * 100, 2) if total_spend > 0 else 0.0
    return {
        "total_campaigns": total_campaigns,
        "total_spend": total_spend,
        "total_revenue": total_revenue,
        "roi": roi,
    }
