import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, MenuItem } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean

  addItem: (item: MenuItem) => void
  removeItem: (itemId: number) => void
  updateQuantity: (itemId: number, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void

  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((ci) => ci.item.id === item.id)
          if (existing) {
            return {
              items: state.items.map((ci) =>
                ci.item.id === item.id
                  ? { ...ci, quantity: ci.quantity + 1 }
                  : ci
              ),
            }
          }
          return { items: [...state.items, { item, quantity: 1 }] }
        })
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((ci) => ci.item.id !== itemId),
        }))
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        set((state) => ({
          items: state.items.map((ci) =>
            ci.item.id === itemId ? { ...ci, quantity } : ci
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      totalItems: () => get().items.reduce((sum, ci) => sum + ci.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0),
    }),
    {
      name: 'royal-kids-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
