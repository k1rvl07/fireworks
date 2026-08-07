<script setup lang="ts">
import { ref } from 'vue'
import { reviews } from '@/data/site'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import StarRating from '@/components/ui/StarRating.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const track = ref<HTMLElement | null>(null)

function scrollBy(dir: 1 | -1) {
  track.value?.scrollBy({ left: dir * 400, behavior: 'smooth' })
}
</script>

<template>
  <section class="relative overflow-hidden py-16 md:py-20">
    <div class="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-flame-500/5 blur-3xl" />

    <div class="mx-auto max-w-7xl px-4 md:px-6">
      <div class="flex items-end justify-between gap-6">
        <SectionTitle
          eyebrow="Отзывы"
          title="Что говорят клиенты"
          subtitle="Более 500 постоянных клиентов доверяют нам свои праздники"
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

      <div ref="track" class="scrollbar-hidden -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0">
        <figure
          v-for="review in reviews"
          :key="review.id"
          class="card flex w-[85%] shrink-0 snap-start flex-col p-6 sm:w-[420px]"
        >
          <div class="mb-4 flex items-center gap-3">
            <span
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-extrabold text-night-950"
              :style="{ background: `linear-gradient(135deg, ${review.photoGradient[0]}, ${review.photoGradient[1]})` }"
            >
              {{ review.name.charAt(0) }}
            </span>
            <div class="min-w-0">
              <figcaption class="truncate font-bold text-white">{{ review.name }}</figcaption>
              <p class="text-xs text-mist-600">{{ review.date }}<span v-if="review.service"> · {{ review.service }}</span></p>
            </div>
          </div>
          <StarRating :rating="review.rating" class="mb-3" />
          <blockquote class="text-sm leading-relaxed text-mist-400">«{{ review.text }}»</blockquote>
        </figure>
      </div>
    </div>
  </section>
</template>
