from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..db.database import get_db
from ..models.field import Field
from ..schemas.field import FieldCreate, FieldRead
from ..deps.auth import get_current_user
from ..models.user import User
from shapely.geometry import shape as shapely_shape
from geoalchemy2.shape import from_shape

router = APIRouter()


@router.get("/", response_model=List[FieldRead])
def list_fields(property_id: str | None = None, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    q = db.query(Field)
    if property_id:
        q = q.filter(Field.property_id == property_id)
    return q.order_by(Field.created_at.desc()).all()


@router.post("/", response_model=FieldRead, status_code=201)
def create_field(data: FieldCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Cria instância básica
    field = Field(name=data.name, property_id=data.property_id)

    # Se veio GeoJSON, converte para geometry (WKBElement) e WKT
    if data.geojson:
        try:
            shp = shapely_shape(data.geojson)
            field.polygon_wkt = shp.wkt
            field.geom = from_shape(shp, srid=4326)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"GeoJSON inválido: {e}")
    else:
        # Fallback: se veio polygon_wkt, tenta popular geom via PostGIS ao persistir (ou usar migração)
        field.polygon_wkt = data.polygon_wkt

    db.add(field)
    db.commit()
    db.refresh(field)
    return field