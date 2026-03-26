from sqlalchemy import String, Integer, Numeric, Boolean, Text, ForeignKey, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .database import Base
import enum


class CategoryEnum(str, enum.Enum):
    pizza = "pizza"
    rolls = "rolls"
    kids = "kids"
    european = "european"
    drinks = "drinks"
    salads = "salads"
    soups = "soups"
    desserts = "desserts"


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    slug: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    icon: Mapped[str] = mapped_column(String(10), nullable=False, default="🍽️")
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    items: Mapped[list["MenuItem"]] = relationship("MenuItem", back_populates="category")


class MenuItem(Base):
    __tablename__ = "menu_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    weight: Mapped[str] = mapped_column(String(50), nullable=True)  # "500г", "8 шт"
    image_url: Mapped[str] = mapped_column(String(500), nullable=True)
    is_available: Mapped[bool] = mapped_column(Boolean, default=True)
    is_popular: Mapped[bool] = mapped_column(Boolean, default=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    category: Mapped["Category"] = relationship("Category", back_populates="items")


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    customer_name: Mapped[str] = mapped_column(String(100), nullable=False)
    customer_phone: Mapped[str] = mapped_column(String(20), nullable=False)
    delivery_address: Mapped[str] = mapped_column(Text, nullable=True)
    comment: Mapped[str] = mapped_column(Text, nullable=True)
    total_price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="new")  # new, confirmed, cooking, delivering, done

    items: Mapped[list["OrderItem"]] = relationship("OrderItem", back_populates="order")


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"), nullable=False)
    menu_item_id: Mapped[int] = mapped_column(ForeignKey("menu_items.id"), nullable=False)
    menu_item_name: Mapped[str] = mapped_column(String(200), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)

    order: Mapped["Order"] = relationship("Order", back_populates="items")
