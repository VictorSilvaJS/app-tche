from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, DateTime, Float
from .base import UUIDMixin, TimestampMixin
from ..db.database import Base
from datetime import datetime

class SamplePoint(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "sample_points"
    field_id: Mapped[str] = mapped_column(String(36), index=True)
    depth_cm: Mapped[int] = mapped_column()
    collected_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    latitude: Mapped[float] = mapped_column(Float, nullable=True)
    longitude: Mapped[float] = mapped_column(Float, nullable=True)