<script lang="ts" setup>
import { codeToHtml } from 'shiki'

const inputCode = ref('')
const snippetJson = ref('')

// 复制内容
const snippetCopy = ref('')

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
      <CopiedBtn :if-show="snippetJson" :copy-value="snippetCopy" />
    </div>
  </div>
</template>

<style scoped>

</style>
