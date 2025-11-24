from fastapi import FastAPI, Depends
from .routers import auth, users, properties, fields, samples, analyses, recommendations, health
from .db.database import get_db, Base, engine

app = FastAPI(title="Tche Fertilidade API", version="0.1.0")

# Criação de tabelas (MVP sem Alembic). Em produção usar migrações.
Base.metadata.create_all(bind=engine)

app.include_router(health.router)
app.include_router(auth.router, prefix="/auth", tags=["auth"]) 
app.include_router(users.router, prefix="/users", tags=["users"]) 
app.include_router(properties.router, prefix="/properties", tags=["properties"]) 
app.include_router(fields.router, prefix="/fields", tags=["fields"]) 
app.include_router(samples.router, prefix="/samples", tags=["samples"]) 
app.include_router(analyses.router, prefix="/analyses", tags=["analyses"]) 
app.include_router(recommendations.router, prefix="/recommendations", tags=["recommendations"]) 