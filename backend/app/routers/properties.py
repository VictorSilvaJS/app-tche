from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..db.database import get_db
from ..models.property import Property
from ..schemas.property import PropertyCreate, PropertyRead
from ..deps.auth import get_current_user
from ..models.user import User

router = APIRouter()

@router.get("/", response_model=List[PropertyRead])
def list_properties(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    props = db.query(Property).filter(Property.owner_id == current_user.id).all()
    return props

@router.post("/", response_model=PropertyRead, status_code=201)
def create_property(data: PropertyCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    prop = Property(name=data.name, owner_id=current_user.id)
    db.add(prop)
    db.commit()
    db.refresh(prop)
    return prop