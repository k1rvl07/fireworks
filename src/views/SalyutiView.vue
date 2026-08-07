<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { maxPrice, minPrice, productFilters, products, formatPrice } from '@/data/products'
import type { Product } from '@/types'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import QuickViewModal from '@/components/ui/QuickViewModal.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const route = useRoute()
const router = useRouter()

const PAGE_SIZE = 12
const page = ref(1)
const query = ref(typeof route.query.q === 'string' ? route.query.q : '')
const quickViewProduct = ref<Product | null>(null)
const filtersOpen = ref(false)

const filters = reactive({
  priceMax: maxPrice,
  calibers: [] as string[],
  heights: [] as string[],
  durations: [] as string[],
  stock: 'all' as 'all' | 'in' | 'order',
})

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return products.filter((p) => {
    if (q && !`${p.name} ${p.shortDesc} ${p.fullDesc} ${p.effects.join(' ')}`.toLowerCase().includes(q)) return false
    if (p.price > filters.priceMax) return false
    if (filters.calibers.length && !filters.calibers.includes(p.caliber)) return false
    if (filters.heights.length && !filters.heights.some((h) => p.height.includes(h.replace('до ', '').replace(' м', '')))) return false
    if (filters.durations.length && !filters.durations.some((d) => matchesDuration(p.duration, d))) return false
    if (filters.stock === 'in' && p.stock <= 0) return false
    if (filters.stock === 'order' && p.stock > 0) return false
    return true
  })
})

function matchesDuration(productDuration: string, filter: string) {
  const value = parseInt(productDuration, 10)
  if (Number.isNaN(value)) return false
  if (filter === 'до 30 сек') return value <= 30
  if (filter === 'до 45 сек') return value <= 45
  if (filter === 'до 60 сек') return value <= 60
  return value > 60
}

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const paginated = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return filtered.value.slice(start, start + PAGE_SIZE)
})

function toggle(list: string[], value: string) {
  const i = list.indexOf(value)
  if (i >= 0) list.splice(i, 1)
  else list.push(value)
  page.value = 1
}

function setStock(value: 'all' | 'in' | 'order') {
  filters.stock = value
  page.value = 1
}

function resetFilters() {
  filters.priceMax = maxPrice
  filters.calibers = []
  filters.heights = []
  filters.durations = []
  filters.stock = 'all'
  query.value = ''
  page.value = 1
}

watch(query, () => {
  page.value = 1
  router.replace({ query: query.value ? { q: query.value } : {} })
})

watch(
  () => route.query.q,
  (q) => {
    query.value = typeof q === 'string' ? q : ''
  },
)
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
    <SectionTitle
      eyebrow="Онлайн-витрина"
      title="Салюты"
      subtitle="Все товары сертифицированы. Подберите салют по цене, калибру и характеристикам"
    />

    <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">
      <div class="relative w-full lg:max-w-md">
        <input
          v-model="query"
          type="search"
          placeholder="Поиск по названию и описанию…"
          class="input-base !py-3.5 pr-12"
        >
        <AppIcon name="search" :size="20" class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-mist-600" />
      </div>
      <button class="btn-ghost h-12 self-start px-5 lg:hidden" @click="filtersOpen = !filtersOpen">
        <AppIcon name="filter" :size="18" />
        Фильтры
        <span v-if="filters.calibers.length + filters.heights.length + filters.durations.length > 0" class="rounded-full bg-flame-500 px-2 text-xs font-bold text-white">
          {{ filters.calibers.length + filters.heights.length + filters.durations.length }}
        </span>
      </button>
      <p class="ml-auto text-sm text-mist-400">Найдено: <b class="text-white">{{ filtered.length }}</b></p>
    </div>

    <div class="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside
        class="card h-fit shrink-0 p-6 lg:sticky lg:top-24"
        :class="filtersOpen ? 'block' : 'hidden lg:block'"
      >
        <div class="mb-5 flex items-center justify-between">
          <h2 class="text-lg font-bold text-white">Фильтры</h2>
          <button class="text-sm text-mist-400 underline-offset-2 transition hover:text-gold-400 hover:underline" @click="resetFilters">
            Сбросить всё
          </button>
        </div>

        <div class="space-y-7">
          <div>
            <div class="mb-3 flex items-center justify-between text-sm">
              <span class="font-semibold text-mist-200">Цена до</span>
              <span class="font-bold text-gold-400">{{ formatPrice(filters.priceMax) }}</span>
            </div>
            <input
              v-model.number="filters.priceMax"
              type="range"
              :min="minPrice"
              :max="maxPrice"
              step="100"
              class="w-full accent-flame-500"
            >
            <div class="mt-1 flex justify-between text-xs text-mist-600">
              <span>{{ formatPrice(minPrice) }}</span>
              <span>{{ formatPrice(maxPrice) }}</span>
            </div>
          </div>

          <div>
            <p class="mb-3 font-semibold text-mist-200">Калибр</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="caliber in productFilters.calibers"
                :key="caliber"
                class="rounded-full border px-3.5 py-1.5 text-sm font-semibold transition"
                :class="filters.calibers.includes(caliber) ? 'border-flame-500 bg-flame-500/15 text-flame-500' : 'border-white/15 text-mist-400 hover:border-mist-400'"
                @click="toggle(filters.calibers, caliber)"
              >
                {{ caliber }}""
              </button>
            </div>
          </div>

          <div>
            <p class="mb-3 font-semibold text-mist-200">Высота</p>
            <ul class="space-y-2.5">
              <li v-for="height in productFilters.heights" :key="height">
                <label class="flex cursor-pointer items-center gap-3 text-sm text-mist-200">
                  <input
                    type="checkbox"
                    :checked="filters.heights.includes(height)"
                    class="h-4 w-4 accent-gold-400"
                    @change="toggle(filters.heights, height)"
                  >
                  {{ height }}
                </label>
              </li>
            </ul>
          </div>

          <div>
            <p class="mb-3 font-semibold text-mist-200">Длительность</p>
            <ul class="space-y-2.5">
              <li v-for="duration in productFilters.durations" :key="duration">
                <label class="flex cursor-pointer items-center gap-3 text-sm text-mist-200">
                  <input
                    type="checkbox"
                    :checked="filters.durations.includes(duration)"
                    class="h-4 w-4 accent-gold-400"
                    @change="toggle(filters.durations, duration)"
                  >
                  {{ duration }}
                </label>
              </li>
            </ul>
          </div>

          <div>
            <p class="mb-3 font-semibold text-mist-200">Наличие</p>
            <div class="grid grid-cols-3 gap-1 rounded-xl border border-white/10 p-1 text-sm">
              <button
                v-for="opt in [
                  { id: 'all', label: 'Все' },
                  { id: 'in', label: 'В наличии' },
                  { id: 'order', label: 'Под заказ' },
                ]"
                :key="opt.id"
                class="rounded-lg py-2 font-semibold transition"
                :class="filters.stock === opt.id ? 'bg-gradient-to-r from-flame-500 to-gold-400 text-night-900' : 'text-mist-400 hover:text-white'"
                @click="setStock(opt.id as 'all' | 'in' | 'order')"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div>
        <div v-if="paginated.length" class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <ProductCard
            v-for="product in paginated"
            :key="product.id"
            :product="product"
            @quickview="quickViewProduct = $event"
          />
        </div>
        <div v-else class="card flex flex-col items-center gap-4 p-12 text-center">
          <AppIcon name="search" :size="40" class="text-mist-600" />
          <p class="text-lg font-bold text-white">Ничего не найдено</p>
          <p class="text-sm text-mist-400">Попробуйте изменить параметры фильтров или сбросить их</p>
          <button class="btn-ghost mt-2 h-11 px-6" @click="resetFilters">Сбросить фильтры</button>
        </div>

        <nav v-if="totalPages > 1" class="mt-10 flex items-center justify-center gap-2" aria-label="Пагинация">
          <button
            class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-mist-200 transition hover:border-gold-400 hover:text-gold-400 disabled:pointer-events-none disabled:opacity-40"
            :disabled="page <= 1"
            aria-label="Предыдущая страница"
            @click="page--"
          >
            <AppIcon name="chevron-left" :size="18" />
          </button>
          <button
            v-for="p in totalPages"
            :key="p"
            class="h-11 min-w-11 rounded-xl border px-3 font-semibold transition"
            :class="p === page ? 'border-transparent bg-gradient-to-r from-flame-500 to-gold-400 text-night-900 shadow-glow-orange' : 'border-white/15 text-mist-300 hover:border-gold-400/60 hover:text-gold-400'"
            :aria-current="p === page ? 'page' : undefined"
            @click="page = p"
          >
            {{ p }}
          </button>
          <button
            class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-mist-200 transition hover:border-gold-400 hover:text-gold-400 disabled:pointer-events-none disabled:opacity-40"
            :disabled="page >= totalPages"
            aria-label="Следующая страница"
            @click="page++"
          >
            <AppIcon name="chevron-right" :size="18" />
          </button>
        </nav>
      </div>
    </div>

    <QuickViewModal :product="quickViewProduct" @close="quickViewProduct = null" />
  </div>
</template>
