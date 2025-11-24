from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Float
from .base import UUIDMixin, TimestampMixin
from ..db.database import Base

class Recommendation(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "recommendations"
    analysis_id: Mapped[str] = mapped_column(String(36), index=True)
    n_kg_ha: Mapped[float] = mapped_column(Float, nullable=True)
    p2o5_kg_ha: Mapped[float] = mapped_column(Float, nullable=True)
    k2o_kg_ha: Mapped[float] = mapped_column(Float, nullable=True)
    lime_t_ha: Mapped[float] = mapped_column(Float, nullable=True)