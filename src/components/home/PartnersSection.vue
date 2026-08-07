<script setup lang="ts">
import { partners } from '@/data/site'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
</script>

<template>
  <section class="py-16 md:py-20">
    <div class="mx-auto max-w-7xl px-4 md:px-6">
      <SectionTitle eyebrow="Партнёры" title="С кем мы работаем" center />

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <div
          v-for="(partner, i) in partners"
          :key="partner.id"
          v-reveal="{ delay: i * 60 }"
          class="card flex h-24 items-center justify-center p-4 text-center transition-all duration-300 hover:border-gold-400/40"
        >
          <span class="flex items-center gap-1.5 text-sm font-bold text-mist-400 transition-colors hover:text-gold-400">
            <AppIcon name="sparkles" :size="14" class="shrink-0" />
            {{ partner.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
