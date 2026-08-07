<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '@/types'
import { formatPrice } from '@/data/products'
import { useCartStore } from '@/stores/cart'
import AppIcon from './AppIcon.vue'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'

const props = defineProps<{ product: Product | null }>()

const emit = defineEmits<{ close: [] }>()

const router = useRouter()
const cart = useCartStore()

const qty = ref(1)
const added = ref(false)

watch(
  () => props.product,
  (product) => {
    qty.value = 1
    added.value = false
    if (product) {
      document.addEventListener('keydown', onKeydown)
    } else {
      document.removeEventListener('keydown', onKeydown)
    }
  },
)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
}

function addToCart() {
  if (!props.product) return
  cart.add(props.product.id, qty.value)
  added.value = true
  setTimeout(() => {
    added.value = false
    emit('close')
  }, 900)
}

function goToProduct() {
  if (!props.product) return
  emit('close')
  router.push(`/catalog/salyuti/${props.product.slug}/`)
}
</script>

<template>
  <BaseModal :open="!!product" :title="product?.name ?? ''" wide @close="emit('close')">
    <div v-if="product" class="grid gap-6 md:grid-cols-2">
      <div
        class="relative flex aspect-[4/3] items-center justify-center rounded-xl border border-white/10"
        :style="{ background: `linear-gradient(135deg, ${product.gradient[0]}44, ${product.gradient[1]}33), radial-gradient(circle at 30% 20%, ${product.gradient[0]}66, transparent 45%), radial-gradient(circle at 70% 65%, ${product.gradient[1]}55, transparent 50%), #0B0E1A` }"
      >
        <div
          class="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 animate-sparkle rounded-full opacity-70 blur-md"
          :style="{ background: `radial-gradient(circle, ${product.gradient[0]}77, transparent 70%)` }"
        />
        <AppIcon name="sparkles" :size="52" class="relative text-white/80 drop-shadow-[0_0_14px_rgba(255,255,255,0.6)]" />
      </div>

      <div class="flex flex-col gap-4">
        <p class="text-sm leading-relaxed text-mist-300">{{ product.fullDesc }}</p>

        <ul class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <li class="flex items-center gap-2 text-mist-400"><AppIcon name="zap" :size="16" class="text-sky-400" /> Калибр: <b class="text-white">{{ product.caliber }}</b></li>
          <li class="flex items-center gap-2 text-mist-400"><AppIcon name="sparkles" :size="16" class="text-gold-400" /> Залпов: <b class="text-white">{{ product.shots }}</b></li>
          <li class="flex items-center gap-2 text-mist-400"><AppIcon name="rocket" :size="16" class="text-flame-500" /> Высота: <b class="text-white">{{ product.height }}</b></li>
          <li class="flex items-center gap-2 text-mist-400"><AppIcon name="clock" :size="16" class="text-gold-400" /> Длительность: <b class="text-white">{{ product.duration }}</b></li>
        </ul>

        <div class="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div>
            <p class="text-2xl font-extrabold text-gold-400">{{ formatPrice(product.price) }}</p>
            <p v-if="product.oldPrice" class="text-sm text-mist-600 line-through">{{ formatPrice(product.oldPrice) }}</p>
          </div>
          <span class="text-sm font-semibold" :class="product.stock > 0 ? 'text-success' : 'text-mist-400'">
            {{ product.stock > 0 ? 'В наличии' : 'Под заказ' }}
          </span>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex h-12 items-center rounded-xl border border-night-500">
            <button
              class="flex h-full w-11 items-center justify-center text-mist-400 transition hover:text-gold-400"
              aria-label="Уменьшить количество"
              @click="qty = Math.max(1, qty - 1)"
            >
              <AppIcon name="minus" :size="16" />
            </button>
            <span class="w-8 text-center font-bold text-white">{{ qty }}</span>
            <button
              class="flex h-full w-11 items-center justify-center text-mist-400 transition hover:text-gold-400"
              aria-label="Увеличить количество"
              @click="qty++"
            >
              <AppIcon name="plus" :size="16" />
            </button>
          </div>
          <BaseButton class="flex-1" :disabled="added" @click="addToCart">
            <AppIcon name="cart" :size="18" />
            {{ added ? 'Добавлено!' : 'В корзину' }}
          </BaseButton>
        </div>

        <button class="text-sm font-semibold text-sky-400 transition hover:text-gold-400" @click="goToProduct">
          Подробнее о товаре →
        </button>
      </div>
    </div>
  </BaseModal>
</template>
