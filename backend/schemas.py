from pydantic import BaseModel, Field
from typing import Optional, List


# ─── Категории ────────────────────────────────────────────────────────────────

class CategoryOut(BaseModel):
    id: int
    slug: str
    name: str
    icon: str
    sort_order: int

    model_config = {"from_attributes": True}


# ─── Блюда меню ───────────────────────────────────────────────────────────────

class MenuItemOut(BaseModel):
    id: int
    category_id: int
    name: str
    description: Optional[str] = None
    price: float
    weight: Optional[str] = None
    image_url: Optional[str] = None
    is_available: bool
    is_popular: bool

    model_config = {"from_attributes": True}


# ─── Заказы ───────────────────────────────────────────────────────────────────

class OrderItemIn(BaseModel):
    menu_item_id: int
    quantity: int = Field(ge=1)


class OrderCreate(BaseModel):
    customer_name: str = Field(min_length=2, max_length=100)
    customer_phone: str = Field(min_length=7, max_length=20)
    delivery_address: Optional[str] = None
    comment: Optional[str] = None
    items: List[OrderItemIn]


class OrderItemOut(BaseModel):
    menu_item_id: int
    menu_item_name: str
    quantity: int
    price: float

    model_config = {"from_attributes": True}


class OrderOut(BaseModel):
    id: int
    customer_name: str
    customer_phone: str
    delivery_address: Optional[str] = None
    total_price: float
    status: str
    items: List[OrderItemOut]

    model_config = {"from_attributes": True}
