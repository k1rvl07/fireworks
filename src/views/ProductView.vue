<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatPrice, products } from '@/data/products'
import { productReviews } from '@/data/site'
import { useCartStore } from '@/stores/cart'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import StarRating from '@/components/ui/StarRating.vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import QuickViewModal from '@/components/ui/QuickViewModal.vue'
import type { Product } from '@/types'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()

const product = computed(() => products.find((p) => p.slug === route.params.slug) ?? null)
const qty = ref(1)
const added = ref(false)
const selectedImage = ref(0)
const playVideo = ref(false)
const quickViewProduct = ref<Product | null>(null)

const related = computed(() => {
  const p = product.value
  if (!p) return []
  return products.filter((item) => item.id !== p.id && item.caliber === p.caliber).slice(0, 4)
})

const reviews = computed(() => {
  const p = product.value
  return p ? productReviews.filter((r) => r.productId === p.id) : []
})

const specRows = computed(() => {
  const p = product.value
  if (!p) return []
  return [
    { label: 'Калибр', value: p.caliber },
    { label: 'Количество зарядов', value: `${p.shots}` },
    { label: 'Высота подъёма', value: p.height },
    { label: 'Длительность', value: p.duration },
    { label: 'Класс опасности', value: p.safetyClass },
    { label: 'Эффекты', value: p.effects.join(', ') },
    { label: 'Упаковка', value: 'Батарея салютов / индивидуальная коробка' },
  ]
})

function addToCart() {
  if (!product.value) return
  cart.add(product.value.id, qty.value)
  added.value = true
  setTimeout(() => (added.value = false), 1500)
}

watch(
  () => route.params.slug,
  () => {
    qty.value = 1
    selectedImage.value = 0
    playVideo.value = false
  },
)

if (!product.value) {
  router.replace('/catalog/salyuti/')
}
</script>

<template>
  <div v-if="product" class="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
    <nav class="mb-8 flex flex-wrap items-center gap-2 text-sm text-mist-400" aria-label="Хлебные крошки">
      <RouterLink to="/" class="transition hover:text-gold-400">Главная</RouterLink>
      <AppIcon name="chevron-right" :size="14" />
      <RouterLink to="/catalog/" class="transition hover:text-gold-400">Каталог</RouterLink>
      <AppIcon name="chevron-right" :size="14" />
      <RouterLink to="/catalog/salyuti/" class="transition hover:text-gold-400">Салюты</RouterLink>
      <AppIcon name="chevron-right" :size="14" />
      <span class="text-white">{{ product.name }}</span>
    </nav>

    <div class="grid gap-10 lg:grid-cols-2">
      <div>
        <div
          class="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-white/10"
          :style="{ background: `linear-gradient(135deg, ${product.gradient[0]}44, ${product.gradient[1]}33), radial-gradient(circle at 30% 20%, ${product.gradient[0]}66, transparent 45%), radial-gradient(circle at 70% 65%, ${product.gradient[1]}55, transparent 50%), #0B0E1A` }"
        >
          <div
            v-if="!playVideo"
            class="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 animate-sparkle rounded-full opacity-70 blur-md"
            :style="{ background: `radial-gradient(circle, ${product.gradient[0]}77, transparent 70%)` }"
          />
          <AppIcon v-if="!playVideo" name="sparkles" :size="64" class="relative text-white/80 drop-shadow-[0_0_16px_rgba(255,255,255,0.6)]" />

          <div v-if="playVideo" class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-night-950/90">
            <AppIcon name="sparkles" :size="72" class="animate-sparkle text-gold-400" />
            <p class="text-sm text-mist-400">Демонстрация эффектов (видео-плейсхолдер)</p>
          </div>

          <button
            class="absolute bottom-4 left-4 flex h-11 items-center gap-2 rounded-full bg-night-950/70 px-5 text-sm font-bold text-white backdrop-blur transition hover:bg-flame-500"
            @click="playVideo = !playVideo"
          >
            <AppIcon :name="playVideo ? 'close' : 'play'" :size="18" />
            {{ playVideo ? 'Стоп' : 'Смотреть видео' }}
          </button>
        </div>

        <div class="mt-4 grid grid-cols-4 gap-3">
          <button
            v-for="i in 4"
            :key="i"
            class="flex aspect-[4/3] items-center justify-center rounded-xl border transition-all"
            :class="selectedImage === i ? 'border-gold-400 shadow-glow-gold' : 'border-white/10 opacity-70 hover:opacity-100'"
            :style="{ background: `linear-gradient(135deg, ${product.gradient[0]}55, ${product.gradient[1]}44), #0B0E1A` }"
            :aria-label="`Фото ${i}`"
            @click="selectedImage = i; playVideo = false"
          >
            <AppIcon :name="i === 2 ? 'play' : 'sparkles'" :size="20" class="text-white/70" />
          </button>
        </div>
      </div>

      <div>
        <div class="mb-2 flex items-center gap-2">
          <span v-if="product.isNew" class="rounded-full bg-sky-400/90 px-3 py-1 text-xs font-bold text-night-950">Новинка</span>
          <span v-if="product.isPopular" class="rounded-full bg-flame-500/90 px-3 py-1 text-xs font-bold text-white">Хит продаж</span>
          <span class="text-sm font-semibold" :class="product.stock > 0 ? 'text-success' : 'text-mist-400'">
            {{ product.stock > 0 ? `В наличии: ${product.stock} шт.` : 'Под заказ (срок 5–7 дней)' }}
          </span>
        </div>
        <h1 class="mb-4 text-3xl font-extrabold text-white md:text-4xl">{{ product.name }}</h1>
        <p class="mb-6 text-lg leading-relaxed text-mist-300">{{ product.fullDesc }}</p>

        <div class="mb-8 flex items-end gap-4">
          <p class="text-4xl font-extrabold text-gold-400">{{ formatPrice(product.price) }}</p>
          <p v-if="product.oldPrice" class="pb-1 text-xl text-mist-600 line-through">{{ formatPrice(product.oldPrice) }}</p>
        </div>

        <div class="mb-8 flex flex-wrap items-center gap-3">
          <div class="flex h-14 items-center rounded-xl border border-night-500 bg-night-800/60">
            <button class="flex h-full w-12 items-center justify-center text-mist-400 transition hover:text-gold-400" aria-label="Меньше" @click="qty = Math.max(1, qty - 1)">
              <AppIcon name="minus" :size="16" />
            </button>
            <span class="w-10 text-center text-lg font-bold text-white">{{ qty }}</span>
            <button class="flex h-full w-12 items-center justify-center text-mist-400 transition hover:text-gold-400" aria-label="Больше" @click="qty++">
              <AppIcon name="plus" :size="16" />
            </button>
          </div>
          <BaseButton size="lg" class="min-w-56 flex-1 sm:flex-none" :disabled="added" @click="addToCart">
            <AppIcon :name="added ? 'check' : 'cart'" :size="20" />
            {{ added ? 'Добавлено!' : 'В корзину' }}
          </BaseButton>
        </div>

        <div class="card overflow-hidden">
          <h2 class="border-b border-white/10 bg-night-950/40 px-6 py-4 text-lg font-bold text-white">Характеристики</h2>
          <dl class="divide-y divide-white/5">
            <div v-for="row in specRows" :key="row.label" class="flex justify-between gap-6 px-6 py-3.5 text-sm">
              <dt class="text-mist-400">{{ row.label }}</dt>
              <dd class="text-right font-semibold text-white capitalize">{{ row.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <section v-if="reviews.length" class="mt-16">
      <h2 class="section-title mb-8">Отзывы покупателей</h2>
      <div class="grid gap-5 md:grid-cols-2">
        <figure v-for="review in reviews" :key="review.id" class="card p-6">
          <div class="mb-3 flex items-center justify-between">
            <figcaption class="font-bold text-white">{{ review.name }}</figcaption>
            <time class="text-xs text-mist-600">{{ review.date }}</time>
          </div>
          <StarRating :rating="review.rating" class="mb-3" />
          <blockquote class="text-sm leading-relaxed text-mist-400">{{ review.text }}</blockquote>
        </figure>
      </div>
    </section>

    <section v-if="related.length" class="mt-16">
      <div class="mb-8 flex items-end justify-between gap-6">
        <h2 class="section-title">Похожие товары</h2>
        <RouterLink to="/catalog/salyuti/" class="shrink-0 text-sm font-semibold text-sky-400 transition hover:text-gold-400">
          Смотреть все →
        </RouterLink>
      </div>
      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <ProductCard v-for="item in related" :key="item.id" :product="item" compact @quickview="quickViewProduct = $event" />
      </div>
    </section>

    <QuickViewModal :product="quickViewProduct" @close="quickViewProduct = null" />
  </div>
</template>
