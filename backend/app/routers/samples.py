from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..models.sample_point import SamplePoint
from ..schemas.sample_point import SamplePointCreate, SamplePointRead
from typing import List
from ..deps.auth import get_current_user
from ..models.user import User

router = APIRouter()

@router.get("/", response_model=List[SamplePointRead])
def list_samples(field_id: str | None = None, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    q = db.query(SamplePoint)
    if field_id:
        q = q.filter(SamplePoint.field_id == field_id)
    return q.order_by(SamplePoint.collected_at.desc()).all()

@router.post("/", response_model=SamplePointRead, status_code=201)
def create_sample(data: SamplePointCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    sample = SamplePoint(**data.model_dict())
    db.add(sample)
    db.commit()
    db.refresh(sample)
    return sample