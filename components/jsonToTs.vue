<script lang="ts" setup>
import JsonToTS from 'json-to-ts'
import { codeToHtml } from 'shiki'

// 获取当前主题
const colorMode = useColorMode()

const inputJson = ref('')
const rootInterfaceName = ref('')
// 用于复制的内容
const tsInterface = ref('')
const highlightedCode = ref('')

const { showMessage } = useMessage()

async function convertToTs() {
  try {
    const jsonObj = JSON.parse(inputJson.value)
    const code = JsonToTS(jsonObj, {
      rootName: rootInterfaceName.value || 'RootInterface',
    }).join('\n\n')
    tsInterface.value = code

    // 根据当前主题选择 Shiki 主题
    const theme = colorMode.value === 'dark' ? 'vitesse-dark' : 'vitesse-light'

    highlightedCode.value = await codeToHtml(code, {
      lang: 'typescript',
      theme,
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
// 监听主题变化
watch(colorMode, () => {
  if (inputJson.value) {
    convertToTs()
  }
})
</script>

<template>
  <div class="grid grid-cols-2 gap-5">
    <div>
      <textarea
        v-model="inputJson"
        class="fr h-164 w-full border-2 border-gray-200 rounded-lg p-4 placeholder-gray-400"
        dark="dbg dbr focus:ring-gray-200"
        placeholder="在此输入 JSON 数据..."
      />
      <input
        v-model="rootInterfaceName"
        class="fr mt-4 w-full gap-4 border-2 border-gray-200 rounded-lg p-2"
        dark="dbg dbr focus:ring-gray-200"
        placeholder="接口名称"
      >
      <button
        class="mt-4 gap-4 btn"
        @click="convertToTs"
      >
        转换
      </button>
    </div>
    <div class="relative overflow-y-auto">
      <pre class="h-[72vh] p-4" v-html="highlightedCode" />
      <CopiedBtn :if-show="highlightedCode" :copy-value="tsInterface" />
    </div>
  </div>
</template>

<style scoped>
textarea:focus {
  outline: none; /* 移除默认的蓝色 outline */
}
input:focus {
  outline: none; /* 移除默认的蓝色 outline */
}
</style>
