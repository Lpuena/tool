<script lang="ts" setup>
const props = defineProps<{
  ifShow: string
  copyValue: string
}>()

const { showMessage } = useMessage()

const copied = ref(false)

// 重置复制状态
function resetCopied() {
  setTimeout(() => {
    copied.value = false
  }, 1500)
}

async function copy() {
  try {
    await navigator.clipboard.writeText(props.copyValue)
    copied.value = true
    resetCopied()
    showMessage('success', 'JSON 已复制到剪贴板')
  }
  catch {
    showMessage('error', '复制失败，请手动复制')
  }
}
</script>

<template>
  <div>
    <button
      v-if="ifShow"
      class="absolute top-2 right-2 p-2 w-9 h-9 bg-white/80 hover:bg-white rounded-lg shadow hover:shadow-md transition-all"
      @click="copy"
    >
      <CopiedCom :copied="copied" />
    </button>
  </div>
</template>

<style scoped>
</style>
