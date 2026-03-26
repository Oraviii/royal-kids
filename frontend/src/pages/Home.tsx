import { useState } from 'react'
import { CategoryTabs } from '@/components/CategoryTabs'
import { MenuGrid } from '@/components/MenuGrid'
import { CATEGORIES, getItemsByCategory } from '@/data/mockData'

export function Home() {
  const [activeSlug, setActiveSlug] = useState<string>(CATEGORIES[0].slug)

  const items = getItemsByCategory(activeSlug)
  const activeCategory = CATEGORIES.find(c => c.slug === activeSlug)

  const handleSelectCategory = (slug: string) => {
    setActiveSlug(slug)
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main>
      {/* ─── Hero-баннер ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-dark via-[#1a3a50] to-[#0d2233] text-white py-10 sm:py-16">
        <div className="container">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 rounded-full px-4 py-1.5 text-sm mb-4">
              👑 Семейный ресторан в Козьмодемьянске
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
              Вкусная еда<br />
              <span className="text-brand-gold">с доставкой на дом</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg mb-6">
              Пицца, роллы, европейская кухня и детское меню.<br />
              Доставка за 45–60 минут по всему городу.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#menu-section"
                className="bg-brand-red hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Смотреть меню
              </a>
              <a
                href="tel:+78362000000"
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors border border-white/20"
              >
                Позвонить
              </a>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { emoji: '🚗', text: 'Доставка 45 мин' },
                { emoji: '🔥', text: 'Горячее меню' },
                { emoji: '👶', text: 'Детское меню' },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 text-sm text-white/70">
                  <span>{badge.emoji}</span>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Табы категорий ──────────────────────────────────────────────────── */}
      <CategoryTabs
        categories={CATEGORIES}
        activeSlug={activeSlug}
        onSelect={handleSelectCategory}
      />

      {/* ─── Меню ────────────────────────────────────────────────────────────── */}
      <section id="menu-section" className="container py-6">
        {activeCategory && (
          <h2 className="text-xl font-bold mb-4">
            {activeCategory.icon} {activeCategory.name}
          </h2>
        )}
        <MenuGrid items={items} loading={false} />
      </section>

      {/* ─── О ресторане ─────────────────────────────────────────────────────── */}
      <section className="bg-muted py-10 sm:py-14 mt-4">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">Почему выбирают Royal Kids?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: '👨‍🍳', title: 'Домашняя кухня', text: 'Готовим из свежих продуктов каждый день. Никаких полуфабрикатов.' },
              { icon: '🏠', title: 'Удобная доставка', text: 'Доставляем горячими прямо до вашей двери. Работаем по всему Козьмодемьянску.' },
              { icon: '👶', title: 'Для всей семьи', text: 'Специальное детское меню, чтобы и малыши были довольны.' },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-border">
                <div className="text-4xl mb-3">{card.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
