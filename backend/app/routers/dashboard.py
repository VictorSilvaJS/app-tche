from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..deps.auth import get_current_user
from ..models.user import User
from ..models.property import Property
from ..models.field import Field
from ..models.sample_point import SamplePoint

router = APIRouter(tags=["dashboard"])

@router.get("/dashboard")
def dashboard_summary(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    props_count = db.query(Property).filter(Property.owner_id == current_user.id).count()
    fields_count = db.query(Field).join(Property, Field.property_id == Property.id).filter(Property.owner_id == current_user.id).count()
    samples_count = db.query(SamplePoint).count()  # ajustar para filtrar por propriedades se necessário
    return {
        "properties": props_count,
        "fields": fields_count,
        "sample_points": samples_count
    }