<script setup lang="ts">
import { slides } from '@/data/site'
import { formatPrice } from '@/data/products'
import BaseSlider from '@/components/ui/BaseSlider.vue'
import SparkBackground from '@/components/ui/SparkBackground.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <section class="relative overflow-hidden" aria-label="Баннер">
    <SparkBackground :density="90" />

    <div class="relative">
      <BaseSlider :items="slides" autoplay :interval="7000">
        <template #slide="{ item }">
          <div class="px-4 md:px-6">
            <div
              class="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center overflow-hidden rounded-3xl py-16 md:min-h-[calc(100vh-5rem)] md:py-20 lg:min-h-[calc(100vh-8rem)]"
              :style="{ background: `radial-gradient(ellipse at 70% 30%, ${item.gradient[1]}55, transparent 60%), linear-gradient(160deg, ${item.gradient[0]} 0%, #0B0E1A 75%)` }"
            >
              <div
                class="pointer-events-none absolute -right-20 top-1/4 h-96 w-96 animate-sparkle rounded-full opacity-30 blur-3xl"
                :style="{ background: `radial-gradient(circle, ${item.gradient[1]}, transparent 70%)` }"
              />
              <div class="relative z-10 max-w-2xl px-6 md:px-14">
                <p class="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-night-950/40 px-4 py-1.5 text-sm font-semibold tracking-widest text-gold-400 uppercase backdrop-blur">
                  <AppIcon name="sparkles" :size="14" />
                  {{ item.eyebrow }}
                </p>
                <h1 class="mb-5 text-4xl leading-tight font-extrabold text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] md:text-6xl">
                  {{ item.title }}
                </h1>
                <p class="mb-8 max-w-xl text-lg leading-relaxed text-mist-100/90 md:text-xl">
                  {{ item.subtitle }}
                </p>
                <div class="flex flex-wrap items-center gap-4">
                  <RouterLink :to="item.cta.to">
                    <BaseButton size="lg">
                      {{ item.cta.label }}
                      <AppIcon name="arrow-right" :size="20" />
                    </BaseButton>
                  </RouterLink>
                  <div v-if="item.priceFrom" class="text-sm text-mist-200">
                    от <span class="text-2xl font-extrabold text-gold-400">{{ formatPrice(item.priceFrom) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </BaseSlider>
    </div>

    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night-900 to-transparent" />
  </section>
</template>
