from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .database import engine, Base
from .config import settings
from .routers import menu, orders


@asynccontextmanager
async def lifespan(app: FastAPI):
    # При старте — создаём таблицы, если их нет
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(
    title="Royal Kids API",
    description="API для сайта доставки ресторана Royal Kids",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — разрешаем запросы с фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роутеры
app.include_router(menu.router)
app.include_router(orders.router)


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "Royal Kids API"}
