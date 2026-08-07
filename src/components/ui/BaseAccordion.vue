<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'

withDefaults(defineProps<{ items: { q: string; a: string }[] }>(), {})

const openIndex = ref<number | null>(0)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}

function collapse(el: Element) {
  const target = el as HTMLElement
  target.style.maxHeight = target.scrollHeight + 'px'
  requestAnimationFrame(() => {
    target.style.maxHeight = '0px'
  })
}
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="(item, index) in items"
      :key="item.q"
      class="card overflow-hidden transition-colors duration-300"
      :class="openIndex === index ? 'border-gold-400/40' : ''"
    >
      <button
        class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        :aria-expanded="openIndex === index"
        @click="toggle(index)"
      >
        <span class="font-semibold text-white">{{ item.q }}</span>
        <AppIcon
          name="chevron-down"
          class="shrink-0 text-gold-400 transition-transform duration-300"
          :class="openIndex === index ? 'rotate-180' : ''"
        />
      </button>
      <Transition
        @enter="(el) => { (el as HTMLElement).style.maxHeight = el.scrollHeight + 'px' }"
        @after-enter="(el) => { (el as HTMLElement).style.maxHeight = 'none' }"
        @leave="collapse"
      >
        <div v-show="openIndex === index" class="overflow-hidden transition-[max-height] duration-300 ease-out">
          <p class="px-5 pb-5 leading-relaxed text-mist-400">{{ item.a }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>
