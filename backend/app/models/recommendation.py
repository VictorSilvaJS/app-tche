from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from .base import UUIDMixin, TimestampMixin
from ..db.database import Base

class Recommendation(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "recommendations"
    analysis_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("lab_analyses.id"), index=True, unique=True)
    n_kg_ha: Mapped[float | None] = mapped_column(Float, nullable=True)
    p2o5_kg_ha: Mapped[float | None] = mapped_column(Float, nullable=True)
    k2o_kg_ha: Mapped[float | None] = mapped_column(Float, nullable=True)
    lime_t_ha: Mapped[float | None] = mapped_column(Float, nullable=True)
    analysis: Mapped["LabAnalysis"] = relationship("LabAnalysis", back_populates="recommendation")