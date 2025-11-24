from pydantic import BaseModel
import uuid

class PropertyBase(BaseModel):
    name: str

class PropertyCreate(PropertyBase):
    pass

class PropertyRead(PropertyBase):
    id: uuid.UUID
    owner_id: uuid.UUID

    class Config:
        from_attributes = True