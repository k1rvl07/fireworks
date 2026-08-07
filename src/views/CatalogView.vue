<script setup lang="ts">
import SectionTitle from '@/components/ui/SectionTitle.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SparkBackground from '@/components/ui/SparkBackground.vue'
</script>

<template>
  <div class="relative overflow-hidden">
    <SparkBackground :density="40" :opacity="0.5" />

    <section class="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <SectionTitle
        eyebrow="Прайс-листы"
        title="Каталог фейерверков"
        subtitle="Скачайте актуальные прайс-листы в формате Excel или подберите салют в онлайн-витрине с фильтрами"
      />

      <div class="grid gap-6 md:grid-cols-2">
        <div v-reveal class="card group relative overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1 hover:border-flame-500/50 hover:shadow-glow-orange">
          <div class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-15 blur-2xl" style="background: radial-gradient(circle, #FF6A00, transparent 70%)" />
          <span class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-flame-500/20 to-gold-400/20 text-flame-500">
            <AppIcon name="sparkles" :size="26" />
          </span>
          <h2 class="mb-2 text-xl font-bold text-white">Бытовая пиротехника</h2>
          <p class="mb-6 text-sm leading-relaxed text-mist-400">
            Салюты, батареи, фонтаны, петарды и римские свечи для самостоятельного использования.
            Формат: <b class="text-mist-100">.xlsx</b> · обновлено <b class="text-gold-400">7 августа 2026</b>
          </p>
          <a href="/files/price-bytovaya.xlsx" download class="inline-block">
            <BaseButton size="lg">
              <AppIcon name="download" :size="20" />
              Скачать прайс-лист
            </BaseButton>
          </a>
        </div>

        <div v-reveal="{ delay: 120 }" class="card group relative overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-glow-gold">
          <div class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-15 blur-2xl" style="background: radial-gradient(circle, #FFD700, transparent 70%)" />
          <span class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/20 to-flame-500/20 text-sky-400">
            <AppIcon name="rocket" :size="26" />
          </span>
          <h2 class="mb-2 text-xl font-bold text-white">Профессиональная пиротехника</h2>
          <p class="mb-6 text-sm leading-relaxed text-mist-400">
            Высотные салюты калибров 1.2–3.0, залповые установки и шоу-системы.
            Продажа только по предварительному согласованию и по лицензии.
            Формат: <b class="text-mist-100">.xlsx</b> · обновлено <b class="text-gold-400">7 августа 2026</b>
          </p>
          <a href="/files/price-professionalnaya.xlsx" download class="inline-block">
            <BaseButton size="lg" variant="ghost">
              <AppIcon name="download" :size="20" />
              Скачать прайс-лист
            </BaseButton>
          </a>
        </div>
      </div>

      <div v-reveal class="card mt-8 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
        <div>
          <h3 class="mb-2 text-xl font-bold text-white">Не нашли нужный салют?</h3>
          <p class="text-mist-400">
            Воспользуйтесь онлайн-витриной: фильтры по цене, калибру, высоте и наличию помогут выбрать быстро.
          </p>
        </div>
        <RouterLink to="/catalog/salyuti/" class="shrink-0">
          <BaseButton>
            Перейти к онлайн-витрине
            <AppIcon name="arrow-right" :size="18" />
          </BaseButton>
        </RouterLink>
      </div>

      <div v-reveal class="mt-8 flex items-start gap-4 rounded-2xl border border-flame-500/30 bg-flame-500/5 p-6">
        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-flame-500/15 text-flame-500">
          <AppIcon name="info" :size="22" />
        </span>
        <p class="text-sm leading-relaxed text-mist-200">
          <b class="text-white">Важно:</b> продажа пиротехнических изделий лицам, не достигшим
          <b class="text-flame-500">16 лет</b>, запрещена законодательством Российской Федерации.
          При получении заказа курьер или менеджер вправе попросить документ, удостоверяющий личность.
        </p>
      </div>
    </section>
  </div>
</template>
