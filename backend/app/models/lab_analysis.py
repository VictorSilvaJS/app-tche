from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional
from sqlalchemy import Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from .base import UUIDMixin, TimestampMixin
from ..db.database import Base

class LabAnalysis(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "lab_analyses"
    sample_point_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("sample_points.id"), index=True)
    ph_h2o: Mapped[float | None] = mapped_column(Float, nullable=True)
    p_mg_dm3: Mapped[float | None] = mapped_column(Float, nullable=True)
    k_cmol_dm3: Mapped[float | None] = mapped_column(Float, nullable=True)
    ca_cmol_dm3: Mapped[float | None] = mapped_column(Float, nullable=True)
    mg_cmol_dm3: Mapped[float | None] = mapped_column(Float, nullable=True)
    mo_g_kg: Mapped[float | None] = mapped_column(Float, nullable=True)
    recommendation: Mapped[Optional["Recommendation"]] = relationship("Recommendation", back_populates="analysis", uselist=False)