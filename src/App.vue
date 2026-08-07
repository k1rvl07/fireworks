<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="flex-1 pt-16 md:pt-20 lg:pt-[124px]">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
