from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String
from .base import UUIDMixin, TimestampMixin
from ..db.database import Base

class Culture(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "cultures"
    name: Mapped[str] = mapped_column(String(80), unique=True)