<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orders'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import SparkBackground from '@/components/ui/SparkBackground.vue'

const orders = useOrderStore()
const router = useRouter()

const order = orders.lastOrder
</script>

<template>
  <div class="relative overflow-hidden">
    <SparkBackground :density="70" :opacity="0.7" />

    <section class="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center md:px-6">
      <span class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-flame-500 to-gold-400 shadow-glow-gold">
        <AppIcon name="check" :size="40" class="text-night-900" />
      </span>

      <h1 class="mb-4 text-3xl font-extrabold text-white md:text-4xl">
        Спасибо! Ваш заказ №{{ order?.id ?? '—' }} оформлен
      </h1>
      <p class="mb-8 max-w-xl text-lg leading-relaxed text-mist-300">
        Менеджер свяжется с вами в ближайшее время для подтверждения заказа, уточнения доставки и согласования способа оплаты.
      </p>

      <div v-if="order" class="card mb-10 w-full max-w-md p-6 text-left text-sm">
        <p class="mb-3 text-xs font-semibold tracking-widest text-mist-600 uppercase">Детали заказа</p>
        <p class="flex justify-between text-mist-300"><span>Сумма</span><b class="text-gold-400">{{ order.total.toLocaleString('ru-RU') }} ₽</b></p>
        <p class="mt-1 flex justify-between text-mist-300"><span>Позиций</span><b class="text-white">{{ order.items.reduce((s, i) => s + i.qty, 0) }} шт.</b></p>
        <p class="mt-1 flex justify-between text-mist-300"><span>Оплата</span><b class="text-white">{{ order.payment === 'cash' ? 'Наличными курьеру' : order.payment === 'card' ? 'Картой онлайн' : 'Безналичный расчёт' }}</b></p>
        <p class="mt-4 border-t border-white/10 pt-3 text-mist-400">
          Доставка: {{ order.address.city }}, {{ order.address.street }}, д. {{ order.address.house }}
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        <RouterLink to="/"><BaseButton size="lg">Вернуться на главную</BaseButton></RouterLink>
        <button class="btn-ghost h-14 px-8 text-lg" @click="router.push('/catalog/salyuti/')">
          Продолжить покупки
        </button>
      </div>
    </section>
  </div>
</template>
