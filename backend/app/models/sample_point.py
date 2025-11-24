from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import DateTime, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from geoalchemy2 import Geometry
from .base import UUIDMixin, TimestampMixin
from ..db.database import Base
from datetime import datetime

class SamplePoint(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "sample_points"
    field_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("fields.id"), index=True)
    depth_cm: Mapped[int] = mapped_column()
    collected_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    latitude: Mapped[float] = mapped_column(Float, nullable=True)
    longitude: Mapped[float] = mapped_column(Float, nullable=True)
    geom: Mapped[str | None] = mapped_column(Geometry(geometry_type="POINT", srid=4326), nullable=True)