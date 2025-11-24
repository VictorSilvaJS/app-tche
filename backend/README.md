# Backend FastAPI - Tchê Fertilidade do Solo

## Visão Geral
Serviço responsável por autenticação, gestão de usuários, propriedades, talhões (geometrias), pontos de amostra, análises laboratoriais e geração de recomendações. Foco inicial: MVP rápido, estrutura modular e preparada para cálculos agronômicos futuros.

## Stack
- FastAPI
- PostgreSQL + PostGIS
- SQLAlchemy 2.x
- GeoAlchemy2 / Shapely
- JWT (python-jose) + hashing (passlib)
- Pydantic Settings para configuração

## Estrutura de Pastas
```
backend/
  pyproject.toml
  README.md
  app/
    main.py
    core/
      config.py
      security.py
    db/
      database.py
    models/
      base.py
      user.py
      property.py
      field.py
      sample_point.py
      lab_analysis.py
      recommendation.py
      culture.py
    schemas/
      user.py
      auth.py
      property.py
      field.py
      sample_point.py
      lab_analysis.py
      recommendation.py
      culture.py
    routers/
      auth.py
      users.py
      properties.py
      fields.py
      samples.py
      analyses.py
      recommendations.py
      health.py
    services/
      recommendation_engine.py
      sync.py
```

## Próximos Passos
1. Implementar migrações (Alembic) posteriormente.
2. Adicionar testes (Pytest) para principais rotas.
3. Implementar motor de cálculo (service `recommendation_engine.py`).
4. Desenhar endpoints de sincronização incremental.

## Execução Local
Crie arquivo `.env`:
```
APP_ENV=dev
DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/tche
JWT_SECRET=supersegredoalterar
JWT_ALG=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Instalação (Windows PowerShell):
```powershell
python -m venv .venv
. .venv/Scripts/Activate.ps1
pip install --upgrade pip
pip install .
uvicorn app.main:app --reload
```

## Convenções
- IDs UUID (preferido) para entidades de domínio.
- Timestamps em UTC.
- Soft delete opcional futuro.
- Rotas versionadas futuramente (`/api/v1`).

## Segurança (MVP)
- Autenticação via JWT (access token + refresh futuro).
- Hash de senha bcrypt.

## Offline
- Endpoints fornecerão filtro `updated_after=timestamp` para sincronização.

## Licença
Interno / Em definição.
