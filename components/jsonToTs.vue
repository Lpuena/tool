<script lang="ts" setup>
import JsonToTS from 'json-to-ts'
import { codeToHtml } from 'shiki'

const copied = ref(false)
const inputJson = ref('')
const rootInterfaceName = ref('')
// 用于复制的内容
const tsInterface = ref('')
const highlightedCode = ref('')

const { showMessage } = useMessage()

// 初始化
highlightedCode.value = await codeToHtml('/* 请粘贴 JSON 数据 */', {
  lang: 'typescript',
  theme: 'vitesse-light',
})

async function convertToTs() {
  try {
    const jsonObj = JSON.parse(inputJson.value)
    const code = JsonToTS(jsonObj, {
      rootName: rootInterfaceName.value || 'RootInterface',
    }).join('\n\n')
    tsInterface.value = code
    highlightedCode.value = await codeToHtml(code, {
      lang: 'typescript',
      theme: 'vitesse-light',
    })
  }
  catch (error) {
    if (error instanceof SyntaxError) {
      showMessage('error', 'JSON 格式错误，请检查输入')
    }
    else {
      console.error(error)
      showMessage('error', error as string)
    }
  }
}
// 重置复制状态
function resetCopied() {
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
async function copyTsInterface() {
  try {
    await navigator.clipboard.writeText(tsInterface.value)
    copied.value = true
    resetCopied()
    showMessage('success', 'Ts Interface 已复制到剪贴板')
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
        v-model="inputJson" class="w-full h-164 p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200  placeholder-gray-400 text-gray-700"
        placeholder="在此输入 JSON 数据..."
      />
      <input
        v-model="rootInterfaceName"
        class="mt-4 gap-4 w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
        placeholder="接口名称"
      >
      <button
        class="btn mt-4 gap-4"
        @click="convertToTs"
      >
        转换
      </button>
    </div>
    <div class="overflow-y-auto relative ">
      <pre class="h-[72vh] p-4" v-html="highlightedCode" />
      <button
        v-if="highlightedCode"
        class="absolute top-2 right-2 p-2 w-9 h-9 bg-white/80 hover:bg-white rounded-lg shadow hover:shadow-md transition-all"
        @click="copyTsInterface"
      >
        <CopiedCom :copied="copied" />
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
