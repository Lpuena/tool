<script lang="ts" setup>
import { codeToHtml } from 'shiki'

// 获取当前主题
const colorMode = useColorMode()

// 输入代码
const inputCode = ref('')

// 生成的 JSON 代码片段
const snippetJson = ref('')

// 复制内容
const snippetCopy = ref('')

// 转换代码为 JSON 片段并高亮显示
async function convertToSnippet() {
  const lines = inputCode.value.split('\n')
  const snippet = {
    body: lines,
  }
  snippetCopy.value = JSON.stringify(snippet, null, 2)

  // 根据当前主题选择 Shiki 主题
  const theme = colorMode.value === 'dark' ? 'vitesse-dark' : 'vitesse-light'

  // 使用动态主题生成高亮代码
  snippetJson.value = await codeToHtml(snippetCopy.value, {
    lang: 'json',
    theme, // 动态设置主题
  })
}

// 监听主题变化
watch(colorMode, () => {
  if (inputCode.value) {
    convertToSnippet()
  }
})
</script>

<template>
  <div class="grid grid-cols-2 gap-5">
    <!-- 输入区域 -->
    <div>
      <textarea
        v-model="inputCode"
        class="h-164 w-full border rounded-lg p-4 fr"
        dark="dbg dbr focus:ring-gray-200"
        placeholder="在此输入需要转换的代码..."
      />
      <button class="mt-4 btn" @click="convertToSnippet">
        转换代码
      </button>
    </div>

    <!-- 输出区域 -->
    <div class="relative">
      <pre
        class="h-200 overflow-auto p-4"
        v-html="snippetJson"
      />
      <CopiedBtn :if-show="snippetJson" :copy-value="snippetCopy" />
    </div>
  </div>
</template>

<style scoped>
/* 自定义样式 */

textarea:focus {
  outline: none; /* 移除默认的蓝色 outline */
}
</style>
