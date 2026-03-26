"""
Скрипт для заполнения базы данных начальными данными.
Запускай: python -m backend.seed
(из папки royal-kids)
"""
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from .config import settings
from .database import Base
from .models import Category, MenuItem

DATABASE_URL = settings.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

CATEGORIES = [
    {"slug": "pizza",    "name": "Пицца",             "icon": "🍕", "sort_order": 1},
    {"slug": "rolls",    "name": "Роллы и суши",      "icon": "🍣", "sort_order": 2},
    {"slug": "european", "name": "Европейская кухня", "icon": "🍝", "sort_order": 3},
    {"slug": "kids",     "name": "Детское меню",      "icon": "🧒", "sort_order": 4},
    {"slug": "salads",   "name": "Салаты",            "icon": "🥗", "sort_order": 5},
    {"slug": "soups",    "name": "Супы",              "icon": "🍲", "sort_order": 6},
    {"slug": "desserts", "name": "Десерты",           "icon": "🍰", "sort_order": 7},
    {"slug": "drinks",   "name": "Напитки",           "icon": "🥤", "sort_order": 8},
]

MENU_ITEMS = [
    # ─── Пицца ───────────────────────────────────────────────────────────────
    {"category": "pizza", "name": "Маргарита", "description": "Томатный соус, моцарелла, свежие томаты, базилик", "price": 490, "weight": "500г", "is_popular": True},
    {"category": "pizza", "name": "Пепперони", "description": "Томатный соус, моцарелла, острая колбаса пепперони", "price": 550, "weight": "550г", "is_popular": True},
    {"category": "pizza", "name": "Четыре сыра", "description": "Моцарелла, чеддер, гауда, пармезан", "price": 590, "weight": "520г"},
    {"category": "pizza", "name": "Ветчина и грибы", "description": "Томатный соус, ветчина, шампиньоны, моцарелла", "price": 520, "weight": "530г"},
    {"category": "pizza", "name": "Барбекю", "description": "Соус BBQ, курица, бекон, лук, моцарелла", "price": 570, "weight": "560г"},
    {"category": "pizza", "name": "Морская", "description": "Томатный соус, креветки, мидии, кальмар, моцарелла", "price": 640, "weight": "540г"},

    # ─── Роллы и суши ─────────────────────────────────────────────────────────
    {"category": "rolls", "name": "Филадельфия классик", "description": "Лосось, сливочный сыр, огурец, авокадо", "price": 480, "weight": "8 шт", "is_popular": True},
    {"category": "rolls", "name": "Калифорния", "description": "Краб, авокадо, огурец, икра тобико", "price": 420, "weight": "8 шт", "is_popular": True},
    {"category": "rolls", "name": "Дракон", "description": "Угорь, авокадо, сливочный сыр, соус унаги", "price": 510, "weight": "8 шт"},
    {"category": "rolls", "name": "Спайси лосось", "description": "Лосось, спайси соус, огурец, кунжут", "price": 400, "weight": "8 шт"},
    {"category": "rolls", "name": "Запечённый лосось", "description": "Лосось, сливочный сыр, японский майонез, запечённые", "price": 450, "weight": "8 шт"},
    {"category": "rolls", "name": "Радуга", "description": "Ассорти рыбы, авокадо, огурец, сливочный сыр", "price": 490, "weight": "8 шт"},
    {"category": "rolls", "name": "Нигири лосось", "description": "Рис, ломтик свежего лосося", "price": 280, "weight": "2 шт"},
    {"category": "rolls", "name": "Мисо суп", "description": "Традиционный японский суп с тофу и водорослями", "price": 180, "weight": "250мл"},

    # ─── Европейская кухня ────────────────────────────────────────────────────
    {"category": "european", "name": "Стейк из свинины", "description": "Свиная шея на гриле, картофель фри, соус", "price": 450, "weight": "350г", "is_popular": True},
    {"category": "european", "name": "Паста Карбонара", "description": "Спагетти, бекон, яичный желток, пармезан, сливки", "price": 380, "weight": "320г"},
    {"category": "european", "name": "Паста Болоньезе", "description": "Тальятелле, говяжий фарш, томатный соус, пармезан", "price": 360, "weight": "320г"},
    {"category": "european", "name": "Куриная грудка гриль", "description": "Куриная грудка на гриле, овощи гриль, соус тартар", "price": 390, "weight": "300г"},
    {"category": "european", "name": "Рыба и картофель", "description": "Филе белой рыбы в кляре, картофель фри, соус", "price": 420, "weight": "380г"},
    {"category": "european", "name": "Бургер Роял", "description": "Говяжья котлета 180г, соус, сыр, томат, лук, салат", "price": 350, "weight": "350г", "is_popular": True},

    # ─── Детское меню ─────────────────────────────────────────────────────────
    {"category": "kids", "name": "Нагетсы с картошкой", "description": "6 куриных нагетсов, картофель фри, кетчуп", "price": 280, "weight": "250г", "is_popular": True},
    {"category": "kids", "name": "Мини-пицца для детей", "description": "Маленькая пицца с сыром и помидором", "price": 220, "weight": "250г"},
    {"category": "kids", "name": "Макароны с сыром", "description": "Отварные макароны с топлёным маслом и сыром", "price": 190, "weight": "200г"},
    {"category": "kids", "name": "Панкейки с ягодами", "description": "Пышные блинчики с ягодным соусом и сметаной", "price": 240, "weight": "200г"},
    {"category": "kids", "name": "Куриный суп-лапша", "description": "Лёгкий бульон с курицей, морковью и лапшой", "price": 210, "weight": "300мл"},

    # ─── Салаты ───────────────────────────────────────────────────────────────
    {"category": "salads", "name": "Цезарь с курицей", "description": "Романо, куриная грудка, гренки, пармезан, соус Цезарь", "price": 320, "weight": "250г", "is_popular": True},
    {"category": "salads", "name": "Греческий", "description": "Огурец, томат, болгарский перец, маслины, фета, оливковое масло", "price": 280, "weight": "250г"},
    {"category": "salads", "name": "Нисуаз", "description": "Тунец, яйцо, стручковая фасоль, томаты, оливки", "price": 350, "weight": "260г"},

    # ─── Супы ─────────────────────────────────────────────────────────────────
    {"category": "soups", "name": "Борщ домашний", "description": "Со свеклой, капустой, свиными рёбрышками и сметаной", "price": 240, "weight": "350мл", "is_popular": True},
    {"category": "soups", "name": "Крем-суп из тыквы", "description": "Нежный крем-суп с тыквой и сливками", "price": 220, "weight": "300мл"},
    {"category": "soups", "name": "Уха рыбная", "description": "Из семги и белой рыбы с картофелем и зеленью", "price": 260, "weight": "350мл"},

    # ─── Десерты ──────────────────────────────────────────────────────────────
    {"category": "desserts", "name": "Тирамису", "description": "Классический итальянский десерт с маскарпоне", "price": 270, "weight": "150г", "is_popular": True},
    {"category": "desserts", "name": "Медовик", "description": "Домашний торт с мёдом и сметанным кремом", "price": 240, "weight": "150г"},
    {"category": "desserts", "name": "Чизкейк Нью-Йорк", "description": "Классический чизкейк с ягодным топпингом", "price": 290, "weight": "150г"},
    {"category": "desserts", "name": "Мороженое (3 шарика)", "description": "Ванильное, шоколадное и клубничное", "price": 180, "weight": "150г"},

    # ─── Напитки ──────────────────────────────────────────────────────────────
    {"category": "drinks", "name": "Лимонад домашний", "description": "Мята, лимон, имбирь, газированная вода", "price": 180, "weight": "400мл"},
    {"category": "drinks", "name": "Морс ягодный", "description": "Из свежих ягод, без консервантов", "price": 150, "weight": "400мл"},
    {"category": "drinks", "name": "Кофе Капучино", "description": "Двойной эспрессо, взбитое молоко", "price": 160, "weight": "300мл"},
    {"category": "drinks", "name": "Чай Иван-чай", "description": "Ферментированный Иван-чай, Козьмодемьянский", "price": 120, "weight": "400мл"},
    {"category": "drinks", "name": "Coca-Cola", "description": "330мл, охлаждённая", "price": 100, "weight": "330мл"},
    {"category": "drinks", "name": "Вода минеральная", "description": "Газированная, 500мл", "price": 80, "weight": "500мл"},
]


async def seed():
    engine = create_async_engine(DATABASE_URL, echo=True)

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_sessionmaker(engine, expire_on_commit=False)() as session:
        # Проверяем, есть ли уже данные
        from sqlalchemy import select
        existing = await session.execute(select(Category))
        if existing.scalars().first():
            print("База данных уже заполнена. Пропускаем.")
            await engine.dispose()
            return

        # Создаём категории
        categories = {}
        for cat_data in CATEGORIES:
            cat = Category(**cat_data)
            session.add(cat)
            categories[cat_data["slug"]] = cat

        await session.flush()

        # Создаём блюда
        for item_data in MENU_ITEMS:
            cat_slug = item_data.pop("category")
            cat = categories[cat_slug]
            item = MenuItem(category_id=cat.id, **item_data)
            session.add(item)

        await session.commit()
        print(f"✅ Загружено {len(CATEGORIES)} категорий и {len(MENU_ITEMS)} блюд")

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(seed())
