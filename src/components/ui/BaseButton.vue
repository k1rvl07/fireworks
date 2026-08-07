<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'gradient' | 'ghost'
    size?: 'md' | 'lg'
    block?: boolean
    disabled?: boolean
    type?: 'button' | 'submit'
  }>(),
  { variant: 'gradient', size: 'md', block: false, disabled: false, type: 'button' },
)

const emit = defineEmits<{ click: [event: MouseEvent] }>()

function onClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      variant === 'gradient' ? 'btn-gradient' : 'btn-ghost',
      size === 'lg' ? 'h-14 px-8 text-lg' : 'h-12 px-6 text-base',
      block ? 'w-full' : '',
    ]"
    @click="onClick"
  >
    <slot />
  </button>
</template>
