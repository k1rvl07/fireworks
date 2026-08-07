<script setup lang="ts">
import AppIcon from './AppIcon.vue'

const props = withDefaults(defineProps<{ rating: number; size?: number }>(), {
  rating: 5,
  size: 18,
})

const filled = (n: number) => (props.rating >= n ? '#FFC400' : 'rgba(255,255,255,0.2)')
</script>

<template>
  <div class="flex items-center gap-0.5" role="img" :aria-label="`Оценка ${rating} из 5`">
    <AppIcon
      v-for="n in 5"
      :key="n"
      name="star"
      :size="size"
      :style="{ fill: filled(n), stroke: filled(n) }"
    />
  </div>
</template>
