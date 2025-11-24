from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String
from .base import UUIDMixin, TimestampMixin
from ..db.database import Base

class User(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "users"
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(160), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    properties: Mapped[list["Property"]] = relationship("Property", back_populates="owner", cascade="all, delete-orphan")