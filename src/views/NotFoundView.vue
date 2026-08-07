<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import SparkBackground from '@/components/ui/SparkBackground.vue'
</script>

<template>
  <div class="relative overflow-hidden">
    <SparkBackground :density="60" :opacity="0.6" />

    <section class="relative mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center md:px-6">
      <p class="text-gradient mb-4 text-8xl font-extrabold">404</p>
      <h1 class="mb-4 text-3xl font-extrabold text-white">Такой страницы нет</h1>
      <p class="mb-8 text-mist-400">
        Возможно, ссылка устарела или салют «улетел» раньше, чем мы успели показать страницу.
        Вернитесь на главную или посмотрите каталог.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <RouterLink to="/"><BaseButton size="lg"><AppIcon name="arrow-right" :size="20" /> На главную</BaseButton></RouterLink>
        <RouterLink to="/catalog/salyuti/"><BaseButton size="lg" variant="ghost">В каталог салютов</BaseButton></RouterLink>
      </div>
    </section>
  </div>
</template>
