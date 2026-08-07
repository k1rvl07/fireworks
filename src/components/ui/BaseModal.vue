<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'
import AppIcon from './AppIcon.vue'

const props = withDefaults(
  defineProps<{
    open: boolean
    title?: string
    wide?: boolean
  }>(),
  { title: '', wide: false },
)

const emit = defineEmits<{ close: [] }>()

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
}

watch(
  () => props.open,
  (open) => {
    if (open) {
      document.addEventListener('keydown', onKeydown)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', onKeydown)
      document.body.style.overflow = ''
    }
  },
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
        <div class="absolute inset-0 bg-night-950/80 backdrop-blur-sm" @click="emit('close')" />
        <div
          :class="[
            'relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-white/10 bg-night-800 p-6 shadow-card md:p-8',
            wide ? 'max-w-3xl' : 'max-w-lg',
          ]"
        >
          <div class="mb-5 flex items-center justify-between gap-4">
            <h3 class="text-xl font-bold text-white">{{ title }}</h3>
            <button
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-mist-400 transition hover:border-flame-500 hover:text-flame-500"
              aria-label="Закрыть"
              @click="emit('close')"
            >
              <AppIcon name="close" :size="20" />
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
  transform: translateY(16px) scale(0.97);
  opacity: 0;
}
</style>
