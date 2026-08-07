<script setup lang="ts">
import { services } from '@/data/site'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <section class="relative overflow-hidden py-16 md:py-20">
    <div class="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

    <div class="mx-auto max-w-7xl px-4 md:px-6">
      <SectionTitle
        eyebrow="Услуги"
        title="Услуги по проведению"
        subtitle="Возьмём на себя всё: подбор сценария, установку, запуск и уборку площадки"
        center
      />

      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="(service, i) in services"
          :key="service.id"
          v-reveal="{ delay: i * 100 }"
          class="card group relative flex flex-col overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-400/40 hover:shadow-glow-gold"
        >
          <div
            class="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-50"
            style="background: radial-gradient(circle, #FF6A00, transparent 70%)"
          />
          <span class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-flame-500/20 to-gold-400/20 text-flame-500">
            <AppIcon :name="service.icon" :size="26" />
          </span>
          <h3 class="mb-2 text-xl font-bold text-white">{{ service.title }}</h3>
          <p class="mb-5 flex-1 text-sm leading-relaxed text-mist-400">{{ service.description }}</p>

          <div class="mb-5 grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-night-950/40 p-4 text-sm">
            <div>
              <p class="text-xs text-mist-600">Стоимость</p>
              <p class="font-bold text-gold-400">{{ service.price }}</p>
            </div>
            <div>
              <p class="text-xs text-mist-600">Высота</p>
              <p class="font-bold text-white">{{ service.height }}</p>
            </div>
            <div class="col-span-2">
              <p class="text-xs text-mist-600">Длительность</p>
              <p class="font-bold text-white">{{ service.duration }}</p>
            </div>
          </div>

          <RouterLink to="/show/">
            <BaseButton variant="ghost" block>
              Заказать расчёт
              <AppIcon name="arrow-right" :size="18" />
            </BaseButton>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
