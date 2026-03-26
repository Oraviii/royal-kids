import { useRef, useEffect } from 'react'
import type { Category } from '@/types'
import { cn } from '@/lib/utils'

interface CategoryTabsProps {
  categories: Category[]
  activeSlug: string
  onSelect: (slug: string) => void
}

export function CategoryTabs({ categories, activeSlug, onSelect }: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Прокручиваем активную вкладку в видимую область при изменении
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const active = container.querySelector('[data-active="true"]') as HTMLElement
    if (active) {
      active.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' })
    }
  }, [activeSlug])

  return (
    <div className="sticky top-[72px] z-30 bg-background/95 backdrop-blur border-b border-border">
      <div className="container">
        <div
          ref={scrollRef}
          className="flex gap-1 py-3 overflow-x-auto scrollbar-none -mx-1 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => (
            <button
              key={cat.slug}
              data-active={cat.slug === activeSlug}
              onClick={() => onSelect(cat.slug)}
              className={cn(
                'flex items-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all shrink-0',
                cat.slug === activeSlug
                  ? 'bg-brand-red text-white shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              )}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
