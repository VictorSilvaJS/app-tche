from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..db.database import get_db
from ..deps.auth import get_current_user
from ..models.user import User
from ..models.lab_analysis import LabAnalysis
from ..models.recommendation import Recommendation
from ..schemas.lab_analysis import LabAnalysisCreate, LabAnalysisRead, LabAnalysisWithRecommendation, RecommendationRead
from ..services.recommendation_engine import generate_recommendation

router = APIRouter()

@router.get("/", response_model=List[LabAnalysisRead])
def list_analyses(sample_point_id: str | None = None, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    q = db.query(LabAnalysis)
    if sample_point_id:
        q = q.filter(LabAnalysis.sample_point_id == sample_point_id)
    return q.order_by(LabAnalysis.created_at.desc()).all()

@router.post("/", response_model=LabAnalysisWithRecommendation, status_code=201)
def create_analysis(data: LabAnalysisCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    analysis = LabAnalysis(**data.model_dict())
    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    # gerar recomendação básica
    rec_values = generate_recommendation(analysis)
    rec = Recommendation(analysis_id=analysis.id, **rec_values)
    db.add(rec)
    db.commit()
    db.refresh(rec)
    analysis.recommendation = rec
    return analysis

@router.get("/{analysis_id}", response_model=LabAnalysisWithRecommendation)
def get_analysis(analysis_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    analysis = db.query(LabAnalysis).filter(LabAnalysis.id == analysis_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Análise não encontrada")
    return analysis

@router.get("/{analysis_id}/recommendation", response_model=RecommendationRead)
def get_recommendation(analysis_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    rec = db.query(Recommendation).filter(Recommendation.analysis_id == analysis_id).first()
    if not rec:
        raise HTTPException(status_code=404, detail="Recomendação não encontrada")
    return rec