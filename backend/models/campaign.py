from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from backend.database import Base

class Campaign(Base):
    __tablename__ = "campaigns"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    channel = Column(String, nullable=False, default="email")
    status = Column(String, nullable=False, default="active")
    budget = Column(Float, nullable=False, default=0.0)
    spend = Column(Float, nullable=False, default=0.0)
    revenue = Column(Float, nullable=False, default=0.0)
    start_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime, nullable=True)

    @property
    def roi(self) -> float:
        if self.spend <= 0:
            return 0.0
        return round(((self.revenue - self.spend) / self.spend) * 100, 2)
