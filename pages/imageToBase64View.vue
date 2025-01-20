<script lang="ts" setup>
const base64String = ref('')
const fileName = ref('')
const fileSize = ref('')

function handleUpload(base64: string, name: string, size: string) {
  base64String.value = base64
  fileName.value = name
  fileSize.value = size
}
</script>

<template>
  <div class="h-[80vh]">
    <div class="flex flex-col items-center justify-center">
      <h2 class="mb-14 text-3xl font-bold">
        图片转 Base64
      </h2>
    </div>

    <div class="mx-auto">
      <ImageUploader @upload="handleUpload" />

      <!-- 结果区域 -->
      <div v-if="base64String" class="mt-8">
        <div
          class="rounded-xl bg-white p-8 shadow-lg"
          dark="bg-[#222] shadow-gray-700/50"
        >
          <p class="mb-4 text-xl text-gray-600">
            文件名：<span class="textCol">{{ fileName }}</span>
          </p>
          <p class="mb-6 text-xl text-gray-600">
            文件大小：<span class="textCol">{{ fileSize }}</span>
          </p>
          <div relative>
            <textarea
              v-model="base64String"
              class="fr h-150 w-full resize-none border border-gray-200 rounded-lg p-4"
              dark="dbg dbr focus:ring-gray-200"
              readonly
            />
            <CopiedBtn :if-show="base64String" :copy-value="base64String" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea:focus {
  outline: none; /* 移除默认的蓝色 outline */
}
</style>
