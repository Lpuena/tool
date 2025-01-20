<script lang="ts" setup>
const file = ref<File | null>(null)
const compressedImage = ref<string | null>(null)
const loading = ref(false)
const fileName = ref('')
const fileSize = ref('')
const fileQuantity = ref(0.85)
const compressedSize = ref('')

const { showMessage } = useMessage()

function handleUpload(base64: string, name: string, size: string) {
  fileName.value = name
  fileSize.value = size
  // 将base64转换为File对象
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  file.value = new File([u8arr], name, { type: mime })
  compressImage()
}

async function compressImage() {
  if (!file.value)
    return

  loading.value = true
  try {
    const image = await createImageBitmap(file.value)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    // 清除canvas缓存
    canvas.width = 0
    canvas.height = 0

    // 保持原图尺寸
    canvas.width = image.width
    canvas.height = image.height

    // 绘制压缩图像
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    // 转换为压缩后的 Blob
    canvas.toBlob(
      (blob) => {
        if (blob) {
          compressedSize.value = `${(blob.size / 1024).toFixed(2)} KB`
          const reader = new FileReader()
          reader.onload = () => {
            compressedImage.value = reader.result as string
            loading.value = false
          }
          reader.readAsDataURL(blob)
        }
      },
      'image/jpeg',
      fileQuantity.value,
    )
  }
  catch {
    showMessage('error', '图片压缩失败:')
    loading.value = false
  }
}
</script>

<template>
  <div class="h-[80vh]">
    <div class="flex flex-col items-center justify-center">
      <h2 class="mb-14 text-3xl font-bold">
        图片压缩工具
      </h2>
    </div>

    <div class="mx-auto">
      <!-- 上传区域 -->
      <div>
        <ImageUploader @upload="handleUpload" />
      </div>

      <!-- 预览区域 -->
      <div class="mt-8 h-10">
        <div v-if="loading" class="py-8 text-center">
          正在压缩图片...
        </div>
        <div
          v-else-if="compressedImage"
          class="h-[55vh] rounded-xl bg-white p-8 shadow-lg"
          dark="bg-[#222] shadow-gray-700/50"
        >
          <div class="flex justify-between">
            <div class="space-y-4">
              <p class="text-lg text-gray-600">
                原文件：<span class="textCol">{{ fileName }}</span>
              </p>
              <p class="text-lg text-gray-600">
                原文件大小：<span class="textCol">{{ fileSize }}</span>
              </p>
              <p class="text-lg text-gray-600">
                压缩后大小：<span class="textCol">{{ compressedSize }}</span>
              </p>
            </div>
            <a
              :href="compressedImage"
              download="compressed.jpg"
              class="mt-4 h-12 btn"
            >
              下载压缩图片
            </a>
          </div>

          <div class="mt-6 flex justify-center">
            <img
              :src="compressedImage"
              alt="压缩后的图片"
              class="max-h-[40vh] border border-gray-200 rounded-lg"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
