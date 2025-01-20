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
      class="absolute right-2 top-2 h-9 w-9 rounded-lg bg-white/80 p-2 shadow transition-all hover:bg-white hover:shadow-md"
      dark="dbg hover:bg-black"
      @click="copy"
    >
      <CopiedCom :copied="copied" />
    </button>
  </div>
</template>

<style scoped>
</style>
