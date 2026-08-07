<script setup lang="ts" generic="T">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import AppIcon from './AppIcon.vue'

const props = withDefaults(
  defineProps<{
    items: T[]
    autoplay?: boolean
    interval?: number
    showArrows?: boolean
    showDots?: boolean
  }>(),
  { autoplay: false, interval: 6000, showArrows: true, showDots: true },
)

const emit = defineEmits<{ change: [index: number] }>()

const track = ref<HTMLElement | null>(null)
const pos = ref(0)
let visualPos = 0
let currentAnim: { anim: Animation; from: number; to: number } | null = null

const totalSlides = computed(() => props.items.length)
const current = computed(() => (totalSlides.value > 0 ? pos.value % totalSlides.value : 0))

const renderItems = computed<T[]>(() =>
  totalSlides.value > 0 ? [...props.items, props.items[0]!] : [],
)

let timer: ReturnType<typeof setInterval> | null = null

function emitChange() {
  emit('change', current.value)
}

function currentVisualPos(): number {
  if (!currentAnim) return visualPos
  const timing = currentAnim.anim.effect?.getComputedTiming()
  const progress = timing?.progress
  if (progress === null || progress === undefined) return visualPos
  const p = Math.min(1, Math.max(0, progress))
  return currentAnim.from + (currentAnim.to - currentAnim.from) * p
}

function moveTo(target: number, animate: boolean) {
  const el = track.value
  if (!el) return
  const from = currentVisualPos()
  currentAnim?.anim.cancel()
  currentAnim = null
  pos.value = target
  if (animate && Math.abs(from - target) > 0.001) {
    const anim = el.animate(
      [
        { transform: `translateX(-${from * 100}%)` },
        { transform: `translateX(-${target * 100}%)` },
      ],
      { duration: 500, easing: 'cubic-bezier(0, 0, 0.2, 1)' },
    )
    currentAnim = { anim, from, to: target }
    anim.addEventListener('finish', () => {
      if (currentAnim?.anim !== anim) return
      currentAnim = null
      visualPos = target
      wrapIfNeeded()
    })
    anim.addEventListener('cancel', () => {
      if (currentAnim?.anim === anim) currentAnim = null
    })
  } else {
    visualPos = target
    wrapIfNeeded()
  }
}

function wrapIfNeeded() {
  if (pos.value === totalSlides.value) {
    visualPos = 0
    pos.value = 0
  }
}

function next() {
  const total = totalSlides.value
  if (total === 0) return
  if (pos.value >= total) {
    moveTo(1, true)
  } else {
    moveTo(pos.value + 1, true)
  }
  emitChange()
}

function prev() {
  const total = totalSlides.value
  if (total === 0) return
  if (pos.value <= 0) {
    moveTo(total, false)
    moveTo(total - 1, true)
  } else {
    moveTo(pos.value - 1, true)
  }
  emitChange()
}

function goTo(index: number) {
  const total = totalSlides.value
  if (total === 0) return
  const target = ((index % total) + total) % total
  if (current.value === target && pos.value === target) return
  moveTo(target, true)
  emitChange()
}

function startAutoplay() {
  if (!props.autoplay) return
  stopAutoplay()
  timer = setInterval(() => next(), props.interval)
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

watch(() => props.autoplay, startAutoplay)

onMounted(startAutoplay)

onBeforeUnmount(stopAutoplay)
</script>

<template>
  <div class="relative" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
    <div class="overflow-hidden">
      <div
        ref="track"
        class="flex"
        :style="{ transform: `translateX(-${pos * 100}%)` }"
      >
        <div v-for="(item, i) in renderItems" :key="i" class="slide w-full shrink-0">
          <slot name="slide" :item="item" :index="i" />
        </div>
      </div>
    </div>

    <div v-if="showArrows" class="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-3 md:px-5">
      <button
        class="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-night-950/50 text-white backdrop-blur transition hover:border-gold-400 hover:text-gold-400"
        aria-label="Предыдущий слайд"
        @click="prev"
      >
        <AppIcon name="chevron-left" :size="22" />
      </button>
      <button
        class="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-night-950/50 text-white backdrop-blur transition hover:border-gold-400 hover:text-gold-400"
        aria-label="Следующий слайд"
        @click="next"
      >
        <AppIcon name="chevron-right" :size="22" />
      </button>
    </div>

    <div v-if="showDots" class="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
      <button
        v-for="i in totalSlides"
        :key="i"
        class="h-2.5 rounded-full transition-all duration-300"
        :class="current === i - 1 ? 'w-8 bg-gold-400' : 'w-2.5 bg-white/30 hover:bg-white/60'"
        :aria-label="`Слайд ${i}`"
        @click="goTo(i - 1)"
      />
    </div>
  </div>
</template>
