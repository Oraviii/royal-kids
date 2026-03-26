import { useState } from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag, ChevronRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

type Step = 'cart' | 'checkout' | 'success'

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCartStore()
  const [step, setStep] = useState<Step>('cart')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [orderId, setOrderId] = useState<number | null>(null)

  // Поля формы заказа
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    // Демо-режим: имитируем отправку заказа
    setTimeout(() => {
      setOrderId(Math.floor(Math.random() * 900) + 100)
      clearCart()
      setStep('success')
      setLoading(false)
    }, 1000)
  }

  const handleClose = () => {
    closeCart()
    // Сброс на корзину через задержку
    setTimeout(() => {
      setStep('cart')
      setError('')
    }, 300)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl animate-slide-in-right">
        {/* Шапка */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
            {step === 'cart' && <><ShoppingBag size={20} className="text-brand-red" /> Корзина</>}
            {step === 'checkout' && <>Оформление заказа</>}
            {step === 'success' && <>Заказ принят! 🎉</>}
          </h2>
          <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Содержимое */}
        <div className="flex-1 overflow-y-auto">
          {/* ── ШАГ 1: КОРЗИНА ── */}
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-8 gap-4">
                  <span className="text-6xl">🛒</span>
                  <div>
                    <p className="font-semibold text-foreground">Корзина пуста</p>
                    <p className="text-sm text-muted-foreground mt-1">Добавьте блюда из меню</p>
                  </div>
                  <button onClick={handleClose} className="btn-add mt-2">
                    Перейти в меню
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {items.map((ci) => (
                    <div key={ci.item.id} className="flex items-center gap-3 px-5 py-3.5">
                      {/* Иконка */}
                      <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                        {ci.item.image_url
                          ? <img src={ci.item.image_url} alt={ci.item.name} className="w-full h-full object-cover rounded-xl" />
                          : '🍽️'
                        }
                      </div>

                      {/* Название + цена */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{ci.item.name}</p>
                        <p className="text-xs text-muted-foreground">{formatPrice(ci.item.price)}</p>
                      </div>

                      {/* Счётчик */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)} className="qty-btn w-7 h-7">
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center text-sm font-bold">{ci.quantity}</span>
                        <button onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)} className="qty-btn w-7 h-7 !bg-brand-red !text-white">
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Удалить */}
                      <button
                        onClick={() => removeItem(ci.item.id)}
                        className="p-1 text-muted-foreground hover:text-red-500 transition-colors ml-1"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── ШАГ 2: ФОРМА ОФОРМЛЕНИЯ ── */}
          {step === 'checkout' && (
            <form id="order-form" onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Ваше имя *</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full border border-input rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Телефон *</label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (000) 000-00-00"
                  className="w-full border border-input rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Адрес доставки</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="ул. Советская, д. 1, кв. 1"
                  className="w-full border border-input rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
                />
                <p className="text-xs text-muted-foreground mt-1">Оставьте пустым для самовывоза</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Комментарий</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Без лука, побыстрее..."
                  rows={3}
                  className="w-full border border-input rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red resize-none"
                />
              </div>

              {/* Итог по заказу */}
              <div className="bg-muted rounded-xl p-3 space-y-1.5">
                <p className="text-xs text-muted-foreground font-medium">Ваш заказ:</p>
                {items.map((ci) => (
                  <div key={ci.item.id} className="flex justify-between text-xs">
                    <span>{ci.item.name} × {ci.quantity}</span>
                    <span className="font-medium">{formatPrice(ci.item.price * ci.quantity)}</span>
                  </div>
                ))}
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
          )}

          {/* ── ШАГ 3: УСПЕХ ── */}
          {step === 'success' && (
            <div className="flex flex-col items-center justify-center h-full text-center px-8 gap-4">
              <span className="text-6xl">🎉</span>
              <div>
                <p className="font-bold text-xl text-foreground">Заказ #{orderId} принят!</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Мы перезвоним вам в течение 5 минут для подтверждения
                </p>
              </div>
              <button onClick={handleClose} className="btn-add mt-2">
                Закрыть
              </button>
            </div>
          )}
        </div>

        {/* Футер с кнопкой */}
        {step !== 'success' && items.length > 0 && (
          <div className="border-t border-border px-5 py-4 bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="text-muted-foreground text-sm">{totalItems()} позиц.</span>
              <span className="font-bold text-lg">{formatPrice(totalPrice())}</span>
            </div>

            {step === 'cart' ? (
              <button
                onClick={() => setStep('checkout')}
                className="w-full btn-add justify-center py-3 text-base rounded-2xl"
              >
                Оформить заказ
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="submit"
                form="order-form"
                disabled={loading}
                className={cn(
                  'w-full btn-add justify-center py-3 text-base rounded-2xl',
                  loading && 'opacity-60 cursor-not-allowed'
                )}
              >
                {loading ? 'Отправляем...' : 'Подтвердить заказ'}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
