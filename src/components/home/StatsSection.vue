<script setup lang="ts">
import { stats } from '@/data/site'
import AppIcon from '@/components/ui/AppIcon.vue'
</script>

<template>
  <section class="relative">
    <div class="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          v-reveal="{ delay: i * 80 }"
          class="card group relative overflow-hidden p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40"
        >
          <div class="pointer-events-none absolute -top-8 left-1/2 h-20 w-40 -translate-x-1/2 rounded-full bg-gold-400/10 blur-2xl transition-opacity group-hover:opacity-100" />
          <p class="text-gradient text-4xl font-extrabold md:text-5xl">{{ stat.value }}</p>
          <p class="mt-2 text-sm text-mist-400">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
