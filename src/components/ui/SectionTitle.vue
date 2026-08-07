<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    subtitle?: string
    center?: boolean
  }>(),
  { eyebrow: '', subtitle: '', center: false },
)
</script>

<template>
  <div class="mb-10 md:mb-14" :class="center ? 'text-center' : ''">
    <p v-if="eyebrow" class="mb-3 text-sm font-semibold tracking-[0.2em] text-flame-500 uppercase">
      {{ eyebrow }}
    </p>
    <h2 class="section-title" :class="center ? '' : 'md:max-w-2xl'">
      <slot name="title">{{ title }}</slot>
    </h2>
    <p v-if="subtitle" class="mt-4 text-lg text-mist-400" :class="center ? 'mx-auto max-w-2xl' : 'max-w-2xl'">
      {{ subtitle }}
    </p>
  </div>
</template>
