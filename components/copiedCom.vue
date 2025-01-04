<script lang="ts" setup>
// eslint-disable-next-line unused-imports/no-unused-vars
const props = defineProps<{
  copied: boolean
}>()

const emit = defineEmits(['click'])
const disabled = ref(false)
function handleClick() {
  if (disabled.value)
    return
  disabled.value = true
  emit('click')

  // 根据动画持续时间设置禁用时间
  setTimeout(() => {
    disabled.value = false
  }, 2000) // 200ms 是动画持续时间
}
</script>

<template>
  <button
    class="transition-content"
    :disabled="disabled"
    @click="handleClick"
  >
    <transition name="icon" mode="out-in">
      <svg
        v-if="!copied"
        key="copy"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      <svg
        v-else
        key="check"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </transition>
  </button>
</template>

<style scoped>
.transition-content {
  all: unset;
  cursor: pointer;
}

.transition-content:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.icon-enter-active,
.icon-leave-active {
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.icon-enter-from {
  opacity: 0;
  transform: scale(0.5) rotate(-45deg);
}

.icon-enter-to {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.icon-leave-from {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.icon-leave-to {
  opacity: 0;
  transform: scale(0.5) rotate(45deg);
}
</style>
