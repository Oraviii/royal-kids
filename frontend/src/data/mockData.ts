import type { Category, MenuItem } from '@/types'

export const CATEGORIES: Category[] = [
  { id: 1, slug: 'pizza',    name: 'Пицца',             icon: '🍕', sort_order: 1 },
  { id: 2, slug: 'rolls',    name: 'Роллы и суши',      icon: '🍣', sort_order: 2 },
  { id: 3, slug: 'european', name: 'Европейская кухня', icon: '🍝', sort_order: 3 },
  { id: 4, slug: 'kids',     name: 'Детское меню',      icon: '🧒', sort_order: 4 },
  { id: 5, slug: 'salads',   name: 'Салаты',            icon: '🥗', sort_order: 5 },
  { id: 6, slug: 'soups',    name: 'Супы',              icon: '🍲', sort_order: 6 },
  { id: 7, slug: 'desserts', name: 'Десерты',           icon: '🍰', sort_order: 7 },
  { id: 8, slug: 'drinks',   name: 'Напитки',           icon: '🥤', sort_order: 8 },
]

export const MENU_ITEMS: MenuItem[] = [
  // Пицца
  { id: 1,  category_id: 1, name: 'Маргарита',        description: 'Томатный соус, моцарелла, свежие томаты, базилик',           price: 490, weight: '500г', is_available: true, is_popular: true },
  { id: 2,  category_id: 1, name: 'Пепперони',         description: 'Томатный соус, моцарелла, острая колбаса пепперони',          price: 550, weight: '550г', is_available: true, is_popular: true },
  { id: 3,  category_id: 1, name: 'Четыре сыра',       description: 'Моцарелла, чеддер, гауда, пармезан',                          price: 590, weight: '520г', is_available: true, is_popular: false },
  { id: 4,  category_id: 1, name: 'Ветчина и грибы',   description: 'Томатный соус, ветчина, шампиньоны, моцарелла',               price: 520, weight: '530г', is_available: true, is_popular: false },
  { id: 5,  category_id: 1, name: 'Барбекю',           description: 'Соус BBQ, курица, бекон, лук, моцарелла',                     price: 570, weight: '560г', is_available: true, is_popular: false },
  { id: 6,  category_id: 1, name: 'Морская',           description: 'Томатный соус, креветки, мидии, кальмар, моцарелла',          price: 640, weight: '540г', is_available: true, is_popular: false },

  // Роллы
  { id: 7,  category_id: 2, name: 'Филадельфия классик', description: 'Лосось, сливочный сыр, огурец, авокадо',                   price: 480, weight: '8 шт', is_available: true, is_popular: true },
  { id: 8,  category_id: 2, name: 'Калифорния',          description: 'Краб, авокадо, огурец, икра тобико',                       price: 420, weight: '8 шт', is_available: true, is_popular: true },
  { id: 9,  category_id: 2, name: 'Дракон',              description: 'Угорь, авокадо, сливочный сыр, соус унаги',                price: 510, weight: '8 шт', is_available: true, is_popular: false },
  { id: 10, category_id: 2, name: 'Спайси лосось',       description: 'Лосось, спайси соус, огурец, кунжут',                      price: 400, weight: '8 шт', is_available: true, is_popular: false },
  { id: 11, category_id: 2, name: 'Запечённый лосось',   description: 'Лосось, сливочный сыр, японский майонез, запечённые',      price: 450, weight: '8 шт', is_available: true, is_popular: false },
  { id: 12, category_id: 2, name: 'Радуга',              description: 'Ассорти рыбы, авокадо, огурец, сливочный сыр',             price: 490, weight: '8 шт', is_available: true, is_popular: false },

  // Европейская кухня
  { id: 13, category_id: 3, name: 'Стейк из свинины',    description: 'Свиная шея на гриле, картофель фри, соус',                 price: 450, weight: '350г', is_available: true, is_popular: true },
  { id: 14, category_id: 3, name: 'Паста Карбонара',     description: 'Спагетти, бекон, яичный желток, пармезан, сливки',         price: 380, weight: '320г', is_available: true, is_popular: false },
  { id: 15, category_id: 3, name: 'Паста Болоньезе',     description: 'Тальятелле, говяжий фарш, томатный соус, пармезан',        price: 360, weight: '320г', is_available: true, is_popular: false },
  { id: 16, category_id: 3, name: 'Бургер Роял',         description: 'Говяжья котлета 180г, соус, сыр, томат, лук, салат',       price: 350, weight: '350г', is_available: true, is_popular: true },

  // Детское меню
  { id: 17, category_id: 4, name: 'Нагетсы с картошкой', description: '6 куриных нагетсов, картофель фри, кетчуп',               price: 280, weight: '250г', is_available: true, is_popular: true },
  { id: 18, category_id: 4, name: 'Мини-пицца для детей', description: 'Маленькая пицца с сыром и помидором',                    price: 220, weight: '250г', is_available: true, is_popular: false },
  { id: 19, category_id: 4, name: 'Макароны с сыром',    description: 'Отварные макароны с топлёным маслом и сыром',              price: 190, weight: '200г', is_available: true, is_popular: false },
  { id: 20, category_id: 4, name: 'Панкейки с ягодами',  description: 'Пышные блинчики с ягодным соусом и сметаной',             price: 240, weight: '200г', is_available: true, is_popular: false },

  // Салаты
  { id: 21, category_id: 5, name: 'Цезарь с курицей',   description: 'Романо, куриная грудка, гренки, пармезан, соус Цезарь',    price: 320, weight: '250г', is_available: true, is_popular: true },
  { id: 22, category_id: 5, name: 'Греческий',           description: 'Огурец, томат, болгарский перец, маслины, фета',           price: 280, weight: '250г', is_available: true, is_popular: false },
  { id: 23, category_id: 5, name: 'Нисуаз',              description: 'Тунец, яйцо, стручковая фасоль, томаты, оливки',           price: 350, weight: '260г', is_available: true, is_popular: false },

  // Супы
  { id: 24, category_id: 6, name: 'Борщ домашний',       description: 'Со свеклой, капустой, свиными рёбрышками и сметаной',     price: 240, weight: '350мл', is_available: true, is_popular: true },
  { id: 25, category_id: 6, name: 'Крем-суп из тыквы',   description: 'Нежный крем-суп с тыквой и сливками',                    price: 220, weight: '300мл', is_available: true, is_popular: false },
  { id: 26, category_id: 6, name: 'Уха рыбная',           description: 'Из семги и белой рыбы с картофелем и зеленью',            price: 260, weight: '350мл', is_available: true, is_popular: false },

  // Десерты
  { id: 27, category_id: 7, name: 'Тирамису',            description: 'Классический итальянский десерт с маскарпоне',            price: 270, weight: '150г', is_available: true, is_popular: true },
  { id: 28, category_id: 7, name: 'Медовик',              description: 'Домашний торт с мёдом и сметанным кремом',                price: 240, weight: '150г', is_available: true, is_popular: false },
  { id: 29, category_id: 7, name: 'Чизкейк Нью-Йорк',   description: 'Классический чизкейк с ягодным топпингом',                price: 290, weight: '150г', is_available: true, is_popular: false },

  // Напитки
  { id: 30, category_id: 8, name: 'Лимонад домашний',    description: 'Мята, лимон, имбирь, газированная вода',                  price: 180, weight: '400мл', is_available: true, is_popular: false },
  { id: 31, category_id: 8, name: 'Морс ягодный',        description: 'Из свежих ягод, без консервантов',                        price: 150, weight: '400мл', is_available: true, is_popular: false },
  { id: 32, category_id: 8, name: 'Кофе Капучино',       description: 'Двойной эспрессо, взбитое молоко',                        price: 160, weight: '300мл', is_available: true, is_popular: false },
  { id: 33, category_id: 8, name: 'Coca-Cola',            description: '330мл, охлаждённая',                                     price: 100, weight: '330мл', is_available: true, is_popular: false },
]

export function getItemsByCategory(slug: string): MenuItem[] {
  const cat = CATEGORIES.find(c => c.slug === slug)
  if (!cat) return []
  return MENU_ITEMS.filter(item => item.category_id === cat.id)
}
