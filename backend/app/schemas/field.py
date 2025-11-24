from pydantic import BaseModel
import uuid
from typing import Any


class FieldBase(BaseModel):
    name: str
    property_id: uuid.UUID
    polygon_wkt: str | None = None
    # Aceita GeoJSON (Feature.geometry ou Geometry) para criação via API
    geojson: dict[str, Any] | None = None


class FieldCreate(FieldBase):
    pass


class FieldRead(FieldBase):
    id: uuid.UUID

    class Config:
        from_attributes = True