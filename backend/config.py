from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://royal_user:royal_pass@localhost:5432/royal_kids"
    SECRET_KEY: str = "change-me-in-production"
    DEBUG: bool = True
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost"

    @property
    def cors_origins_list(self) -> List[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",")]

    class Config:
        env_file = ".env"


settings = Settings()
