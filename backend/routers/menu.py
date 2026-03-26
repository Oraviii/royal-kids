from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from ..database import get_db
from ..models import Category, MenuItem
from ..schemas import CategoryOut, MenuItemOut

router = APIRouter(prefix="/api/menu", tags=["menu"])


@router.get("/categories", response_model=List[CategoryOut])
async def get_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).order_by(Category.sort_order))
    return result.scalars().all()


@router.get("/items", response_model=List[MenuItemOut])
async def get_menu_items(
    category_slug: str | None = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(MenuItem).where(MenuItem.is_available == True)

    if category_slug:
        # Джоин с категориями для фильтрации по slug
        query = (
            query
            .join(Category, MenuItem.category_id == Category.id)
            .where(Category.slug == category_slug)
        )

    query = query.order_by(MenuItem.sort_order)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/items/{item_id}", response_model=MenuItemOut)
async def get_menu_item(item_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MenuItem).where(MenuItem.id == item_id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Блюдо не найдено")
    return item
