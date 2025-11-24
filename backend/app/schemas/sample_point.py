from pydantic import BaseModel
import uuid, datetime

class SamplePointBase(BaseModel):
    field_id: str
    depth_cm: int
    collected_at: datetime.datetime
    latitude: float | None = None
    longitude: float | None = None

class SamplePointCreate(SamplePointBase):
    pass

class SamplePointRead(SamplePointBase):
    id: uuid.UUID

    class Config:
        from_attributes = True