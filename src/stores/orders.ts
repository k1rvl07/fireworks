import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Order } from '@/types'

export const useOrderStore = defineStore('orders', () => {
  const orders = ref<Order[]>([])
  const lastOrder = ref<Order | null>(null)

  function create(order: Omit<Order, 'id' | 'createdAt'>): Order {
    const full: Order = {
      ...order,
      id: Date.now() % 1000000,
      createdAt: new Date().toISOString(),
    }
    orders.value.push(full)
    lastOrder.value = full
    return full
  }

  return { orders, lastOrder, create }
})
