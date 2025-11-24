from pydantic import BaseModel
import uuid

class LabAnalysisBase(BaseModel):
    sample_point_id: uuid.UUID
    ph_h2o: float | None = None
    p_mg_dm3: float | None = None
    k_cmol_dm3: float | None = None
    ca_cmol_dm3: float | None = None
    mg_cmol_dm3: float | None = None
    mo_g_kg: float | None = None

class LabAnalysisCreate(LabAnalysisBase):
    pass

class LabAnalysisRead(LabAnalysisBase):
    id: uuid.UUID

    class Config:
        from_attributes = True

class RecommendationRead(BaseModel):
    id: uuid.UUID
    analysis_id: uuid.UUID
    n_kg_ha: float | None = None
    p2o5_kg_ha: float | None = None
    k2o_kg_ha: float | None = None
    lime_t_ha: float | None = None

    class Config:
        from_attributes = True

class LabAnalysisWithRecommendation(LabAnalysisRead):
    recommendation: RecommendationRead | None = None