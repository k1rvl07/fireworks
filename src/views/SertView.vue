<script setup lang="ts">
import { ref } from 'vue'
import { certificates } from '@/data/site'
import type { Certificate } from '@/types'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const selected = ref<Certificate | null>(null)
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
    <SectionTitle
      eyebrow="Документы"
      title="Сертификаты и лицензии"
      subtitle="Все товары сертифицированы, соответствуют требованиям ГОСТ и имеют паспорта безопасности"
    />

    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(cert, i) in certificates"
        :key="cert.id"
        v-reveal="{ delay: (i % 3) * 100 }"
        class="card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40"
      >
        <button
          class="relative flex aspect-[3/4] cursor-zoom-in items-center justify-center overflow-hidden"
          :style="{ background: `linear-gradient(160deg, ${cert.gradient[0]}44, ${cert.gradient[1]}22), radial-gradient(circle at 50% 30%, ${cert.gradient[0]}33, transparent 60%), #0B0E1A` }"
          :aria-label="`Увеличить: ${cert.title}`"
          @click="selected = cert"
        >
          <div
            class="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-80"
            :style="{ background: `radial-gradient(circle, ${cert.gradient[0]}88, transparent 70%)` }"
          />
          <div class="relative flex flex-col items-center gap-3 px-8 text-center">
            <AppIcon name="file" :size="44" class="text-white/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            <span class="text-xs font-semibold tracking-widest text-mist-400 uppercase">Сертификат №{{ String(cert.id).padStart(3, '0') }}</span>
          </div>
          <span class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-night-950/60 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
            <AppIcon name="zoom" :size="16" />
          </span>
        </button>

        <div class="flex flex-1 flex-col gap-4 p-5">
          <h2 class="text-sm leading-snug font-bold text-white">{{ cert.title }}</h2>
          <a
            :href="cert.pdf ?? '#'"
            :download="!!cert.pdf"
            class="btn-ghost mt-auto h-11 px-4 text-sm"
            :aria-disabled="!cert.pdf"
            :class="!cert.pdf ? 'pointer-events-none opacity-50' : ''"
          >
            <AppIcon name="download" :size="16" />
            Скачать PDF
          </a>
        </div>
      </div>
    </div>

    <div v-reveal class="mt-10 flex items-start gap-4 rounded-2xl border border-sky-400/30 bg-sky-400/5 p-6">
      <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-400/15 text-sky-400">
        <AppIcon name="shield" :size="22" />
      </span>
      <p class="text-sm leading-relaxed text-mist-200">
        Каждая партия пиротехники сопровождается <b class="text-white">паспортом безопасности</b> и проходит
        обязательную сертификацию по требованиям <b class="text-white">ГОСТ Р 51270-99</b>.
        Копии сертификатов выдаются вместе с заказом, оригиналы — по запросу.
      </p>
    </div>

    <BaseModal :open="!!selected" :title="selected?.title ?? ''" wide @close="selected = null">
      <div
        v-if="selected"
        class="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl border border-white/10"
        :style="{ background: `linear-gradient(160deg, ${selected.gradient[0]}55, ${selected.gradient[1]}33), radial-gradient(circle at 50% 30%, ${selected.gradient[0]}44, transparent 60%), #0B0E1A` }"
      >
        <div
          class="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
          :style="{ background: `radial-gradient(circle, ${selected.gradient[0]}99, transparent 70%)` }"
        />
        <div class="relative flex flex-col items-center gap-4 text-center">
          <AppIcon name="file" :size="80" class="text-white/90 drop-shadow-[0_0_18px_rgba(255,255,255,0.6)]" />
          <p class="max-w-sm text-sm text-mist-300">{{ selected.title }}</p>
        </div>
      </div>
    </BaseModal>
  </div>
</template>
