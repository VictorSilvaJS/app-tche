from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Float
from .base import UUIDMixin, TimestampMixin
from ..db.database import Base

class LabAnalysis(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "lab_analyses"
    sample_point_id: Mapped[str] = mapped_column(String(36), index=True)
    ph_h2o: Mapped[float] = mapped_column(Float, nullable=True)
    p_mg_dm3: Mapped[float] = mapped_column(Float, nullable=True)
    k_cmol_dm3: Mapped[float] = mapped_column(Float, nullable=True)
    ca_cmol_dm3: Mapped[float] = mapped_column(Float, nullable=True)
    mg_cmol_dm3: Mapped[float] = mapped_column(Float, nullable=True)
    mo_g_kg: Mapped[float] = mapped_column(Float, nullable=True)