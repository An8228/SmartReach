from backend.database import SessionLocal
from backend.models.campaign import Campaign

SAMPLE_CAMPAIGNS = [
    {"name": "Summer Sale Email Blast", "channel": "email", "status": "active", "budget": 10000, "spend": 6200, "revenue": 15400},
    {"name": "Instagram Brand Awareness", "channel": "social", "status": "active", "budget": 8000, "spend": 7100, "revenue": 9800},
    {"name": "Google Search - Fintech Keywords", "channel": "search", "status": "active", "budget": 12000, "spend": 11800, "revenue": 26500},
    {"name": "Retargeting - Cart Abandoners", "channel": "display", "status": "paused", "budget": 4000, "spend": 3950, "revenue": 5200},
    {"name": "SMS Flash Promo", "channel": "sms", "status": "completed", "budget": 2000, "spend": 1980, "revenue": 3100},
]

def seed_campaigns():
    db = SessionLocal()
    try:
        if db.query(Campaign).count() > 0:
            return
        for data in SAMPLE_CAMPAIGNS:
            db.add(Campaign(**data))
        db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    seed_campaigns()
