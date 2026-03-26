import { Plus, Minus, ShoppingCart, Star } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import type { MenuItem } from '@/types'

// Placeholder-иконки для блюд без фото
const CATEGORY_PLACEHOLDERS: Record<number, string> = {}
const EMOJI_BY_KEYWORDS: Array<[string, string]> = [
  ['пицца', '🍕'],
  ['ролл', '🍣'],
  ['суши', '🍣'],
  ['нигири', '🍣'],
  ['мисо', '🍜'],
  ['паст', '🍝'],
  ['бургер', '🍔'],
  ['стейк', '🥩'],
  ['курин', '🍗'],
  ['рыб', '🐟'],
  ['салат', '🥗'],
  ['суп', '🍲'],
  ['борщ', '🍲'],
  ['уха', '🐠'],
  ['нагетс', '🍗'],
  ['макарон', '🍝'],
  ['панкейк', '🥞'],
  ['тирамису', '🍰'],
  ['торт', '🎂'],
  ['чизкейк', '🍰'],
  ['мороженое', '🍦'],
  ['лимонад', '🍋'],
  ['морс', '🫐'],
  ['кофе', '☕'],
  ['чай', '🍵'],
  ['вода', '💧'],
  ['cola', '🥤'],
  ['кола', '🥤'],
]

function getItemEmoji(name: string): string {
  const lower = name.toLowerCase()
  for (const [keyword, emoji] of EMOJI_BY_KEYWORDS) {
    if (lower.includes(keyword)) return emoji
  }
  return '🍽️'
}

interface MenuCardProps {
  item: MenuItem
}

export function MenuCard({ item }: MenuCardProps) {
  const { items, addItem, updateQuantity } = useCartStore()
  const cartItem = items.find((ci) => ci.item.id === item.id)
  const quantity = cartItem?.quantity ?? 0

  return (
    <div className="menu-card group flex flex-col">
      {/* Изображение блюда */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl select-none">
            {getItemEmoji(item.name)}
          </div>
        )}

        {/* Бейдж "Популярное" */}
        {item.is_popular && (
          <span className="absolute top-2 left-2 bg-brand-gold text-brand-dark text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Star size={10} fill="currentColor" />
            Хит
          </span>
        )}
      </div>

      {/* Контент карточки */}
      <div className="flex flex-col flex-1 p-3 gap-2">
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-foreground leading-snug">{item.name}</h3>
          {item.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
          )}
        </div>

        {/* Вес и цена */}
        <div className="flex items-center justify-between mt-1">
          <div>
            {item.weight && (
              <span className="text-xs text-muted-foreground">{item.weight}</span>
            )}
            <div className="font-bold text-brand-red text-base leading-tight">
              {formatPrice(item.price)}
            </div>
          </div>

          {/* Кнопка добавления / счётчик */}
          {quantity === 0 ? (
            <button
              onClick={() => addItem(item)}
              className="btn-add"
            >
              <Plus size={16} />
              В корзину
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => updateQuantity(item.id, quantity - 1)}
                className="qty-btn"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center font-bold text-sm">{quantity}</span>
              <button
                onClick={() => addItem(item)}
                className="qty-btn !bg-brand-red !text-white hover:!bg-red-600"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
