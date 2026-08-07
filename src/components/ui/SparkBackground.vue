<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{ density?: number; opacity?: number }>(),
  { density: 60, opacity: 0.8 },
)

const canvas = ref<HTMLCanvasElement | null>(null)

interface Spark {
  x: number
  y: number
  r: number
  speed: number
  drift: number
  alpha: number
  twinkle: number
  color: string
}

let sparks: Spark[] = []
let raf = 0
let width = 0
let height = 0

const palette = ['#FFD700', '#FF6A00', '#00A3FF', '#FFFFFF', '#FFC400']

function resize() {
  if (!canvas.value) return
  const parent = canvas.value.parentElement
  if (!parent) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = parent.clientWidth
  height = parent.clientHeight
  canvas.value.width = width * dpr
  canvas.value.height = height * dpr
  canvas.value.style.width = `${width}px`
  canvas.value.style.height = `${height}px`
  const ctx = canvas.value.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function init() {
  const count = Math.round(props.density * (width / 1440))
  sparks = Array.from({ length: Math.max(20, count) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: 0.8 + Math.random() * 1.8,
    speed: 0.05 + Math.random() * 0.25,
    drift: (Math.random() - 0.5) * 0.2,
    alpha: 0.25 + Math.random() * 0.6,
    twinkle: Math.random() * Math.PI * 2,
    color: palette[Math.floor(Math.random() * palette.length)] ?? '#FFD700',
  }))
}

function tick() {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)

  for (const s of sparks) {
    s.y -= s.speed
    s.x += s.drift + Math.sin(s.twinkle) * 0.15
    s.twinkle += 0.03 + Math.random() * 0.02

    if (s.y < -5) {
      s.y = height + 5
      s.x = Math.random() * width
    }
    if (s.x < -5) s.x = width + 5
    if (s.x > width + 5) s.x = -5

    const glow = 0.45 + 0.55 * Math.sin(s.twinkle)
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fillStyle = s.color
    ctx.globalAlpha = s.alpha * glow * props.opacity
    ctx.shadowColor = s.color
    ctx.shadowBlur = s.r * 4
    ctx.fill()
    ctx.shadowBlur = 0
  }
  ctx.globalAlpha = 1

  raf = requestAnimationFrame(tick)
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  resize()
  init()
  tick()
  resizeObserver = new ResizeObserver(() => {
    resize()
    init()
  })
  if (canvas.value?.parentElement) {
    resizeObserver.observe(canvas.value.parentElement)
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  resizeObserver?.disconnect()
})
</script>

<template>
  <canvas ref="canvas" class="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
</template>
