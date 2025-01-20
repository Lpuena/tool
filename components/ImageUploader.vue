<script lang="ts" setup>
// defineProps<{
//   onUpload?: (base64: string, fileName: string, fileSize: string) => void
// }>()

const emit = defineEmits<{
  (e: 'upload', base64: string, fileName: string, fileSize: string): void
}>()

const isLoading = ref(false)
const isDragging = ref(false)

// 处理文件上传
function handleFileUpload(file: File) {
  if (!file.type.startsWith('image/')) {
    return false
  }

  isLoading.value = true

  const reader = new FileReader()
  reader.onload = () => {
    isLoading.value = false
    const base64 = reader.result as string
    const fileName = file.name
    const fileSize = `${(file.size / 1024).toFixed(2)} KB`
    emit('upload', base64, fileName, fileSize)
  }
  reader.readAsDataURL(file)
  return true
}

// 处理文件选择
function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    handleFileUpload(input.files[0])
  }
}

// 处理文件拖拽
function handleDrop(event: DragEvent) {
  isDragging.value = false
  event.preventDefault()
  event.stopPropagation()
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    handleFileUpload(event.dataTransfer.files[0])
  }
}

// 阻止默认拖拽行为
function handleDragOver(event: DragEvent) {
  event.preventDefault()
  event.stopPropagation()
  event.dataTransfer!.dropEffect = 'copy'
}

// 处理拖拽进入
function handleDragEnter(event: DragEvent) {
  event.preventDefault()
  isDragging.value = true
  event.dataTransfer!.dropEffect = 'copy'
}

// 处理拖拽离开
function handleDragLeave(event: DragEvent) {
  const relatedTarget = event.relatedTarget as HTMLElement
  if (!relatedTarget || !(event.currentTarget as HTMLElement)?.contains(relatedTarget)) {
    isDragging.value = false
  }
}
</script>

<template>
  <div
    class="relative border-2 rounded-lg border-dashed p-8 transition-all duration-200"
    dark="border-gray-600"
    :class="{
      'border-blue-500': isDragging,
      'border-gray-200': !isDragging,
    }"
    @dragover="handleDragOver"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <!-- 拖拽时的遮罩层 -->
    <div
      v-if="isDragging"
      class="absolute inset-0 flex items-center justify-center rounded-lg bg-blue-500/20"
    >
      <div class="flex flex-col items-center text-2xl text-blue-500 font-medium">
        <div class="i-carbon-upload mb-2 text-4xl" />
        松开鼠标以上传图片
      </div>
    </div>

    <div v-if="isLoading" class="h-40 flex items-center justify-center">
      <div class="h-12 w-12 animate-spin border-b-2 border-t-2 border-blue-500 rounded-full" />
    </div>
    <div v-else class="h-40 flex flex-col items-center justify-center">
      <div class="i-carbon-image mb-4 text-6xl text-gray-400" />
      <p
        class="text-lg text-gray-500 font-medium"
      >
        拖拽图片到此区域或
      </p>
      <label
        for="file-upload"
        class="mt-4 cursor-pointer btn"
      >
        选择文件
      </label>
      <input
        id="file-upload"
        type="file"
        class="hidden"
        accept="image/*"
        @change="handleFileSelect"
      >
    </div>
  </div>
</template>
