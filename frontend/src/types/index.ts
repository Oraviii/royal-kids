export interface Category {
  id: number
  slug: string
  name: string
  icon: string
  sort_order: number
}

export interface MenuItem {
  id: number
  category_id: number
  name: string
  description?: string
  price: number
  weight?: string
  image_url?: string
  is_available: boolean
  is_popular: boolean
}

export interface CartItem {
  item: MenuItem
  quantity: number
}

export interface OrderCreate {
  customer_name: string
  customer_phone: string
  delivery_address?: string
  comment?: string
  items: { menu_item_id: number; quantity: number }[]
}
