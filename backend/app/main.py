from fastapi import FastAPI
from .routers import auth, users, properties, fields, samples, analyses, recommendations, health, dashboard

app = FastAPI(title="Tche Fertilidade API", version="0.1.0")

# Alembic agora é responsável por criar/atualizar o schema. Removido create_all.

app.include_router(health.router)
app.include_router(auth.router, prefix="/auth", tags=["auth"]) 
app.include_router(users.router, prefix="/users", tags=["users"]) 
app.include_router(properties.router, prefix="/properties", tags=["properties"]) 
app.include_router(fields.router, prefix="/fields", tags=["fields"]) 
app.include_router(samples.router, prefix="/samples", tags=["samples"]) 
app.include_router(analyses.router, prefix="/analyses", tags=["analyses"]) 
app.include_router(recommendations.router, prefix="/recommendations", tags=["recommendations"]) 
app.include_router(dashboard.router)

@app.get("/", tags=["root"])
def root():
	return {"message": "Tche Fertilidade API", "docs_url": "/docs"}