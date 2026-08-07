export interface Product {
  id: number
  slug: string
  name: string
  shortDesc: string
  fullDesc: string
  price: number
  oldPrice?: number
  caliber: string
  shots: number
  height: string
  duration: string
  safetyClass: string
  stock: number
  isPopular?: boolean
  isNew?: boolean
  gradient: [string, string]
  effects: string[]
}

export interface CartItem {
  productId: number
  qty: number
}

export interface Slide {
  id: number
  eyebrow: string
  title: string
  subtitle: string
  cta: { label: string; to: string }
  gradient: [string, string]
  priceFrom?: number
}

export interface Stat {
  value: string
  label: string
}

export interface Service {
  id: number
  title: string
  price: string
  height: string
  duration: string
  description: string
  icon: string
}

export interface Reason {
  id: number
  title: string
  text: string
  icon: string
}

export interface Review {
  id: number
  name: string
  photoGradient: [string, string]
  rating: number
  text: string
  date: string
  service?: string
}

export interface Partner {
  id: number
  name: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface Certificate {
  id: number
  title: string
  gradient: [string, string]
  pdf?: string
}

export interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  gradient: [string, string]
}

export interface PortfolioItem {
  id: number
  type: 'svadba' | 'korporativ' | 'gorodskoy'
  typeLabel: string
  title: string
  gradient: [string, string]
  video?: boolean
}

export interface ShowOption {
  id: string
  title: string
  price: number
  unit: string
}

export interface CheckoutContact {
  name: string
  phone: string
  email: string
}

export interface CheckoutAddress {
  city: string
  street: string
  house: string
  apartment: string
  entrance: string
  floor: string
  comment: string
}

export type PaymentMethod = 'cash' | 'card' | 'invoice'

export interface Order {
  id: number
  contact: CheckoutContact
  address: CheckoutAddress
  payment: PaymentMethod
  items: CartItem[]
  total: number
  createdAt: string
}
