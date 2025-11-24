from pydantic_settings import BaseSettings
from pydantic import AnyUrl

class Settings(BaseSettings):
    app_env: str = "dev"
    database_url: AnyUrl
    jwt_secret: str
    jwt_alg: str = "HS256"
    access_token_expire_minutes: int = 30

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()