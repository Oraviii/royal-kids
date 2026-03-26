import { MenuCard } from './MenuCard'
import type { MenuItem } from '@/types'
import { Loader2 } from 'lucide-react'

interface MenuGridProps {
  items: MenuItem[]
  loading: boolean
  error?: string
}

export function MenuGrid({ items, loading, error }: MenuGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="animate-spin mr-2" size={20} />
        Загружаем меню...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500">
        <p className="text-4xl mb-3">😕</p>
        <p className="font-medium">{error}</p>
        <p className="text-sm text-muted-foreground mt-1">Попробуйте обновить страницу</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-4xl mb-3">🍽️</p>
        <p>В этой категории пока нет блюд</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 animate-fade-in">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  )
}
