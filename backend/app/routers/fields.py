from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..db.database import get_db
from ..models.field import Field
from ..schemas.field import FieldCreate, FieldRead
from ..deps.auth import get_current_user
from ..models.user import User

router = APIRouter()

@router.get("/", response_model=List[FieldRead])
def list_fields(property_id: str | None = None, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    q = db.query(Field)
    if property_id:
        q = q.filter(Field.property_id == property_id)
    return q.order_by(Field.created_at.desc()).all()

@router.post("/", response_model=FieldRead, status_code=201)
def create_field(data: FieldCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    field = Field(**data.model_dict())
    db.add(field)
    db.commit()
    db.refresh(field)
    return field