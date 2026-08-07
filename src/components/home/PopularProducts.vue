<script setup lang="ts">
import { computed, ref } from 'vue'
import { products } from '@/data/products'
import type { Product } from '@/types'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import QuickViewModal from '@/components/ui/QuickViewModal.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const popular = computed(() => products.filter((p) => p.isPopular).slice(0, 6))

const track = ref<HTMLElement | null>(null)
const quickViewProduct = ref<Product | null>(null)

function scrollBy(dir: 1 | -1) {
  track.value?.scrollBy({ left: dir * 320, behavior: 'smooth' })
}
</script>

<template>
  <section class="relative py-16 md:py-20">
    <div class="mx-auto max-w-7xl px-4 md:px-6">
      <div class="flex items-end justify-between gap-6">
        <SectionTitle
          eyebrow="Хиты продаж"
          title="Популярные салюты"
          subtitle="То, что чаще всего выбирают наши клиенты — проверено тысячами праздников"
        />
        <div class="mb-10 hidden shrink-0 gap-2 md:mb-14 md:flex">
          <button
            class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-mist-200 transition hover:border-gold-400 hover:text-gold-400"
            aria-label="Назад"
            @click="scrollBy(-1)"
          >
            <AppIcon name="chevron-left" :size="20" />
          </button>
          <button
            class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-mist-200 transition hover:border-gold-400 hover:text-gold-400"
            aria-label="Вперёд"
            @click="scrollBy(1)"
          >
            <AppIcon name="chevron-right" :size="20" />
          </button>
        </div>
      </div>

      <div ref="track" class="scrollbar-hidden -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pt-2 pb-4 md:mx-0 md:px-0 md:pt-3">
        <div v-for="product in popular" :key="product.id" class="w-[85%] shrink-0 snap-start sm:w-[420px]">
          <ProductCard :product="product" @quickview="quickViewProduct = $event" />
        </div>
      </div>

      <div class="mt-8 text-center">
        <RouterLink to="/catalog/salyuti/">
          <button class="btn-ghost h-12 px-8 text-base">
            Смотреть все салюты
            <AppIcon name="arrow-right" :size="18" />
          </button>
        </RouterLink>
      </div>
    </div>

    <QuickViewModal :product="quickViewProduct" @close="quickViewProduct = null" />
  </section>
</template>
