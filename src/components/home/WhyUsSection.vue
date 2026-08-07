<script setup lang="ts">
import { reasons } from '@/data/site'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
</script>

<template>
  <section class="py-16 md:py-20">
    <div class="mx-auto max-w-7xl px-4 md:px-6">
      <SectionTitle
        eyebrow="Преимущества"
        title="Почему выбирают нас"
        subtitle="Безопасность и качество — не просто слова, а ежедневная работа"
        center
      />

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(reason, i) in reasons"
          :key="reason.id"
          v-reveal="{ delay: (i % 3) * 100 }"
          class="card group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:shadow-glow-blue"
        >
          <span
            class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/15 to-flame-500/15 text-gold-400 transition-colors group-hover:text-sky-400"
          >
            <AppIcon :name="reason.icon" :size="24" />
          </span>
          <h3 class="mb-2 text-lg font-bold text-white">{{ reason.title }}</h3>
          <p class="text-sm leading-relaxed text-mist-400">{{ reason.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
