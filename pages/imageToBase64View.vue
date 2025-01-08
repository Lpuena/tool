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
      <h2 class="text-3xl font-bold mb-14">
        图片转 Base64
      </h2>
    </div>

    <div class="mx-auto">
      <ImageUploader @upload="handleUpload" />

      <!-- 结果区域 -->
      <div v-if="base64String" class="mt-8">
        <div class="bg-white rounded-xl shadow-lg p-8">
          <p class="text-xl text-gray-600 mb-4">
            文件名：<span class="font-bold text-blue-600">{{ fileName }}</span>
          </p>
          <p class="text-xl text-gray-600 mb-6">
            文件大小：<span class="font-bold text-blue-600">{{ fileSize }}</span>
          </p>
          <div relative>
            <textarea
              v-model="base64String"
              class=" w-full h-150 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              readonly
            />
            <CopiedBtn :if-show="base64String" :copy-value="base64String" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
