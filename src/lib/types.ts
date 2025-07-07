export interface Product {
  id: string
  name: string
  type: string
  basePrice: number
  description?: string
  image?: string
  sizes: string[]
  colors: string[]
}

export interface CartItem {
  id: string
  productId: string
  productName: string
  productType: string
  quantity: number
  size: string
  color: string
  embroideryText?: string
  embroideryDesign?: string | null
  embroideryPlacement: string
  threadColors: string[]
  pricePerItem: number
  totalPrice: number
  logoSize?: string
}

export interface OrderSummary {
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone?: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export const PRODUCT_TYPES = {
  SHIRT: 'shirt',
  HAT: 'hat',
  HOODIE: 'hoodie',
  POLO: 'polo',
} as const

export const SIZES = {
  SHIRT: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
  HAT: ['One Size', 'Youth', 'Adult'],
  HOODIE: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
  POLO: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
} as const

export const COLORS = [
  'White', 'Black', 'Navy', 'Red', 'Royal Blue', 'Forest Green',
  'Maroon', 'Purple', 'Orange', 'Pink', 'Yellow', 'Light Blue',
  'Gray', 'Charcoal', 'Khaki', 'Brown'
] as const

export const THREAD_COLORS = [
  'White', 'Black', 'Navy', 'Red', 'Royal Blue', 'Forest Green',
  'Maroon', 'Purple', 'Orange', 'Pink', 'Yellow', 'Light Blue',
  'Gray', 'Gold', 'Silver', 'Brown', 'Lime Green', 'Turquoise'
] as const

export const EMBROIDERY_PLACEMENTS = [
  'Left Chest', 'Right Chest', 'Center Chest', 'Full Back',
  'Left Sleeve', 'Right Sleeve', 'Hat Front', 'Hat Back', 'Hat Side'
] as const

export const FONTS = [
  'Arial', 'Times New Roman', 'Helvetica', 'Georgia', 'Verdana',
  'Script', 'Old English', 'Impact', 'Brush Script'
] as const

export const LOGO_SIZES = [
  'Small (2")', 'Medium (3")', 'Large (4")', 'X-Large (5")'
] as const