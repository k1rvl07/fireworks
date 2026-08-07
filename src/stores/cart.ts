import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { CartItem } from '@/types'
import { products } from '@/data/products'

const STORAGE_KEY = 'fw-cart'

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadCart())

  watch(
    items,
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    },
    { deep: true },
  )

  const totalCount = computed(() => items.value.reduce((sum, it) => sum + it.qty, 0))

  const totalSum = computed(() =>
    items.value.reduce((sum, it) => {
      const product = products.find((p) => p.id === it.productId)
      return sum + (product ? product.price * it.qty : 0)
    }, 0),
  )

  const detailed = computed(() =>
    items.value
      .map((it) => {
        const product = products.find((p) => p.id === it.productId)
        return product ? { product, qty: it.qty } : null
      })
      .filter((it): it is NonNullable<typeof it> => it !== null),
  )

  function add(productId: number, qty = 1) {
    const existing = items.value.find((it) => it.productId === productId)
    if (existing) {
      existing.qty += qty
    } else {
      items.value.push({ productId, qty })
    }
  }

  function setQty(productId: number, qty: number) {
    const existing = items.value.find((it) => it.productId === productId)
    if (!existing) return
    if (qty <= 0) {
      remove(productId)
    } else {
      existing.qty = qty
    }
  }

  function remove(productId: number) {
    items.value = items.value.filter((it) => it.productId !== productId)
  }

  function clear() {
    items.value = []
  }

  return { items, totalCount, totalSum, detailed, add, setQty, remove, clear }
})
