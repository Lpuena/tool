<script lang="ts" setup>
import { codeToHtml } from 'shiki'

const inputCode = ref('')
const snippetJson = ref('')

// 复制内容
const snippetCopy = ref('')

const copied = ref(false)
const { showMessage } = useMessage()

// 重置复制状态
function resetCopied() {
  setTimeout(() => {
    copied.value = false
  }, 1500)
}

async function convertToSnippet() {
  const lines = inputCode.value.split('\n')
  const snippet = {
    body: lines,
  }
  snippetCopy.value = JSON.stringify(snippet, null, 2)
  snippetJson.value = await codeToHtml(snippetCopy.value, {
    theme: 'vitesse-light',
    lang: 'json',
  })
}

async function copyJson() {
  try {
    await navigator.clipboard.writeText(snippetCopy.value)
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
        class="mt-4 btn "
        @click="convertToSnippet"
      >
        转换代码
      </button>
    </div>
    <div class="relative">
      <pre class="p-4 h-[72vh] overflow-auto" v-html="snippetJson" />
      <button
        v-if="snippetJson"
        class="absolute top-2 right-2 p-2 w-9 h-9 bg-white/80 hover:bg-white rounded-lg shadow hover:shadow-md transition-all"
        @click="copyJson"
      >
        <CopiedCom :copied="copied" />
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
