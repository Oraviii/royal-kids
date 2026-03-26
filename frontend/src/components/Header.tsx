import { ShoppingCart, Phone, MapPin, Clock } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export function Header() {
  const { totalItems, toggleCart } = useCartStore()
  const count = totalItems()

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-border shadow-sm">
      {/* Верхняя полоска с контактами */}
      <div className="bg-brand-dark text-white text-xs py-2">
        <div className="container flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <a href="tel:+78362000000" className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
              <Phone size={12} />
              <span>+7 (836-2) 00-00-00</span>
            </a>
            <span className="hidden sm:flex items-center gap-1.5 text-white/70">
              <MapPin size={12} />
              г. Козьмодемьянск
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70">
            <Clock size={12} />
            <span>Пн–Вс 10:00 – 22:00</span>
          </div>
        </div>
      </div>

      {/* Основная строка шапки */}
      <div className="container py-3 flex items-center justify-between gap-4">
        {/* Логотип */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm bg-brand-red flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Royal Kids"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Если файл не найден — показываем эмодзи
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.innerHTML = '👑'
              }}
            />
          </div>
          <div>
            <div className="font-extrabold text-brand-dark text-lg leading-tight">Royal Kids</div>
            <div className="text-xs text-muted-foreground leading-tight">доставка еды</div>
          </div>
        </a>

        {/* Центр: слоган (скрыт на мобилке) */}
        <p className="hidden md:block text-sm text-muted-foreground text-center">
          Быстрая доставка по Козьмодемьянску 🚗
        </p>

        {/* Кнопка корзины */}
        <button
          onClick={toggleCart}
          className="relative flex items-center gap-2 bg-brand-red text-white rounded-xl px-4 py-2.5 font-semibold text-sm hover:bg-red-600 active:scale-95 transition-all shadow-sm"
        >
          <ShoppingCart size={18} />
          <span className="hidden sm:inline">Корзина</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-dark text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 shadow">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
