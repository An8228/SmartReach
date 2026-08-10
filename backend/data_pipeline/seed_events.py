from datetime import datetime
from backend.data_pipeline.raw_events import RawEventStore
from backend.data_pipeline.schemas import RawEvent, EventType

def seed_events(store: RawEventStore):
    events = [
        RawEvent(user_hash="user1", campaign_id=1, event_type=EventType.CAMPAIGN_SENT, channel="email", timestamp=datetime.utcnow()),
        RawEvent(user_hash="user1", campaign_id=1, event_type=EventType.EMAIL_OPENED, channel="email", timestamp=datetime.utcnow()),
        RawEvent(user_hash="user1", campaign_id=1, event_type=EventType.LINK_CLICKED, channel="email", timestamp=datetime.utcnow()),
        RawEvent(user_hash="user1", campaign_id=1, event_type=EventType.CONVERSION, channel="email", timestamp=datetime.utcnow()),
        RawEvent(user_hash="user2", campaign_id=1, event_type=EventType.CAMPAIGN_SENT, channel="email", timestamp=datetime.utcnow()),
        RawEvent(user_hash="user2", campaign_id=1, event_type=EventType.EMAIL_OPENED, channel="email", timestamp=datetime.utcnow()),
        RawEvent(user_hash="user3", campaign_id=2, event_type=EventType.CAMPAIGN_SENT, channel="sms", timestamp=datetime.utcnow()),
    ]
    for event in events:
        store.add_event(event)
