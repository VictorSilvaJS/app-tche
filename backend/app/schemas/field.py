from pydantic import BaseModel
import uuid

class FieldBase(BaseModel):
    name: str
    property_id: uuid.UUID
    polygon_wkt: str | None = None

class FieldCreate(FieldBase):
    pass

class FieldRead(FieldBase):
    id: uuid.UUID

    class Config:
        from_attributes = True