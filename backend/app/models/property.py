from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from .base import UUIDMixin, TimestampMixin
from ..db.database import Base

class Property(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "properties"
    name: Mapped[str] = mapped_column(String(120))
    owner_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), index=True)
    owner: Mapped["User"] = relationship("User", back_populates="properties")
    fields: Mapped[list["Field"]] = relationship("Field", back_populates="property", cascade="all, delete-orphan")