from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from geoalchemy2 import Geometry
from .base import UUIDMixin, TimestampMixin
from ..db.database import Base

class Field(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "fields"
    name: Mapped[str] = mapped_column(String(120))
    property_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("properties.id"), index=True)
    property: Mapped["Property"] = relationship("Property", back_populates="fields")
    # WKT original mantido para compatibilidade; novo campo geom usa PostGIS
    polygon_wkt: Mapped[str | None] = mapped_column(String, nullable=True)
    geom: Mapped[str | None] = mapped_column(Geometry(geometry_type="MULTIPOLYGON", srid=4326), nullable=True)