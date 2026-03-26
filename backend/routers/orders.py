from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from ..database import get_db
from ..models import Order, OrderItem, MenuItem
from ..schemas import OrderCreate, OrderOut

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.post("", response_model=OrderOut, status_code=201)
async def create_order(order_data: OrderCreate, db: AsyncSession = Depends(get_db)):
    # Получаем все блюда из заказа одним запросом
    item_ids = [i.menu_item_id for i in order_data.items]
    result = await db.execute(
        select(MenuItem).where(MenuItem.id.in_(item_ids), MenuItem.is_available == True)
    )
    menu_items = {item.id: item for item in result.scalars().all()}

    # Проверяем, что все блюда найдены
    for order_item in order_data.items:
        if order_item.menu_item_id not in menu_items:
            raise HTTPException(
                status_code=400,
                detail=f"Блюдо с id {order_item.menu_item_id} недоступно"
            )

    # Считаем сумму
    total = sum(
        menu_items[oi.menu_item_id].price * oi.quantity
        for oi in order_data.items
    )

    # Создаём заказ
    order = Order(
        customer_name=order_data.customer_name,
        customer_phone=order_data.customer_phone,
        delivery_address=order_data.delivery_address,
        comment=order_data.comment,
        total_price=total,
        status="new",
    )
    db.add(order)
    await db.flush()  # получаем id заказа без коммита

    # Добавляем позиции заказа
    for oi in order_data.items:
        menu_item = menu_items[oi.menu_item_id]
        db.add(OrderItem(
            order_id=order.id,
            menu_item_id=oi.menu_item_id,
            menu_item_name=menu_item.name,
            quantity=oi.quantity,
            price=float(menu_item.price),
        ))

    await db.commit()

    # Перезагружаем заказ с позициями
    result = await db.execute(
        select(Order)
        .options(selectinload(Order.items))
        .where(Order.id == order.id)
    )
    return result.scalar_one()
