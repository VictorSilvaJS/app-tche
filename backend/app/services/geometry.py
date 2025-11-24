from sqlalchemy import text
from sqlalchemy.orm import Session
from ..models.field import Field

def compute_field_area_hectares(db: Session, field: Field) -> float | None:
    """Calcula área do talhão em hectares usando PostGIS.
    Se geom estiver nulo retorna None.
    Usa projeção métrica WebMercator (3857) apenas para estimativa rápida.
    Para maior precisão geodésica poderia usar geography ou SRID 5880 conforme região.
    """
    if field.geom is None:
        return None
    sql = text("SELECT ST_Area(ST_Transform(:g::geometry, 3857)) / 10000 AS ha")
    result = db.execute(sql, {"g": field.geom}).scalar()
    return float(result) if result is not None else None
