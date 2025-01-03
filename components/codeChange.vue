<script lang="ts" setup>
const inputCode = ref('')
const snippetJson = ref('')
const copied = ref(false)
const { showMessage } = useMessage()

// 重置复制状态
function resetCopied() {
  setTimeout(() => {
    copied.value = false
  }, 1500)
}

function convertToSnippet() {
  const lines = inputCode.value.split('\n')
  const snippet = {
    body: lines,
  }
  snippetJson.value = JSON.stringify(snippet, null, 2)
}

async function copyJson() {
  try {
    await navigator.clipboard.writeText(snippetJson.value)
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
  <div class="grid grid-cols-2 gap-5">
    <div>
      <textarea
        v-model="inputCode"
        class="w-full h-164 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
        placeholder="在此输入需要转换的代码..."
      />
      <button
        class="mt-4 btn bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
        @click="convertToSnippet"
      >
        转换代码
      </button>
    </div>
    <div class="relative">
      <pre class="p-4 bg-gray-100 rounded-lg h-164 overflow-auto">{{ snippetJson }}</pre>
      <button
        v-if="snippetJson"
        class="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-lg shadow hover:shadow-md transition-all"
        @click="copyJson"
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
    </div>
  </div>
</template>

<style scoped>
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
