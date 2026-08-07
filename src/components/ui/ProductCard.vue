<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '@/types'
import { formatPrice } from '@/data/products'
import { useCartStore } from '@/stores/cart'
import AppIcon from './AppIcon.vue'
import BaseButton from './BaseButton.vue'

const props = defineProps<{ product: Product; compact?: boolean }>()

const emit = defineEmits<{ quickview: [product: Product] }>()

const router = useRouter()
const cart = useCartStore()

const added = ref(false)
const hover = ref(false)

function addToCart() {
  cart.add(props.product.id)
  added.value = true
  setTimeout(() => (added.value = false), 1600)
}

function open() {
  router.push(`/catalog/salyuti/${props.product.slug}/`)
}
</script>

<template>
  <article
    class="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-glow-gold"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <div class="relative cursor-pointer overflow-hidden" @click="open">
      <div
        class="relative flex aspect-[4/3] items-center justify-center transition-transform duration-700 group-hover:scale-105"
        :style="{ background: `linear-gradient(135deg, ${product.gradient[0]}33, ${product.gradient[1]}22), radial-gradient(circle at 30% 20%, ${product.gradient[0]}55, transparent 45%), radial-gradient(circle at 70% 65%, ${product.gradient[1]}44, transparent 50%), #0B0E1A` }"
      >
        <div
          class="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-sparkle rounded-full opacity-60 blur-md transition-opacity"
          :style="{ background: `radial-gradient(circle, ${product.gradient[0]}66, transparent 70%)` }"
        />
        <AppIcon name="sparkles" :size="44" class="relative text-white/80 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
        <button
          class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-night-950/60 text-white opacity-0 backdrop-blur transition-all duration-300 hover:bg-flame-500 group-hover:opacity-100"
          :aria-label="`Быстрый просмотр: ${product.name}`"
          @click.stop="emit('quickview', product)"
        >
          <AppIcon name="zoom" :size="18" />
        </button>
      </div>

      <div class="absolute left-3 top-3 flex flex-col items-start gap-1.5">
        <span
          v-if="product.isNew"
          class="rounded-full bg-sky-400/90 px-2.5 py-1 text-xs font-bold text-night-950"
        >
          Новинка
        </span>
        <span
          v-if="product.isPopular"
          class="rounded-full bg-flame-500/90 px-2.5 py-1 text-xs font-bold text-white"
        >
          Хит
        </span>
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-3 p-5">
      <div>
        <button class="text-left text-lg font-bold leading-snug text-white transition-colors hover:text-gold-400" @click="open">
          {{ product.name }}
        </button>
        <p class="mt-1.5 text-sm leading-relaxed text-mist-400">{{ product.shortDesc }}</p>
      </div>

      <div v-if="!compact" class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-mist-400">
        <span class="flex items-center gap-1">
          <AppIcon name="rocket" :size="14" class="text-flame-500" />
          {{ product.height }}
        </span>
        <span class="flex items-center gap-1">
          <AppIcon name="clock" :size="14" class="text-gold-400" />
          {{ product.duration }}
        </span>
        <span class="flex items-center gap-1">
          <AppIcon name="zap" :size="14" class="text-sky-400" />
          {{ product.caliber }}"
        </span>
      </div>

      <div class="mt-auto flex items-end justify-between gap-3 pt-2">
        <div>
          <p class="text-xl font-extrabold text-gold-400">{{ formatPrice(product.price) }}</p>
          <p v-if="product.oldPrice" class="text-sm text-mist-600 line-through">{{ formatPrice(product.oldPrice) }}</p>
        </div>
        <span
          class="text-xs font-semibold"
          :class="product.stock > 0 ? 'text-success' : 'text-mist-400'"
        >
          {{ product.stock > 0 ? 'В наличии' : 'Под заказ' }}
        </span>
      </div>

      <div class="flex gap-2">
        <BaseButton class="flex-1" :size="'md'" :disabled="added" @click="addToCart">
          <AppIcon name="cart" :size="18" />
          {{ added ? 'Добавлено!' : 'В корзину' }}
        </BaseButton>
        <BaseButton variant="ghost" class="px-4" aria-label="Подробнее" @click="open">
          <AppIcon name="info" :size="18" />
        </BaseButton>
      </div>
    </div>
  </article>
</template>
