<script lang="ts" setup>
const pressedKeys = ref<string[]>([])
const recordedKeys = ref<string[]>([])
const isRecording = ref(false)

// 监听 recordedKeys 变化，自动滚动到底部
watch(recordedKeys, async () => {
  await nextTick() // 等待 DOM 更新
  const container = document.querySelector('.recorded-keys-container')
  if (container) {
    container.scrollTop = container.scrollHeight
  }
}, { deep: true })

function handleKeyDown(event: KeyboardEvent) {
  event.preventDefault()

  // 处理 CapsLock 键
  if (event.key === 'CapsLock') {
    const index = pressedKeys.value.indexOf('CapsLock')
    if (index === -1) {
      pressedKeys.value.push('CapsLock')
    }
    else {
      pressedKeys.value.splice(index, 1)
    }
    return
  }

  const key = event.key === ' ' ? 'Space' : event.key
  // 只添加当前按下的键
  if (!pressedKeys.value.includes(key)) {
    pressedKeys.value.push(key)
  }

  // 如果是记录模式，也添加到 recordedKeys
  if (isRecording.value) {
    recordedKeys.value.push(key)
  }
}

function handleKeyUp(event: KeyboardEvent) {
  event.preventDefault()

  // 跳过 CapsLock 键的处理
  if (event.key === 'CapsLock')
    return

  const key = event.key === ' ' ? 'Space' : event.key
  // 移除当前松开的键
  pressedKeys.value = pressedKeys.value.filter(k => k !== key)
}

// 添加事件监听器
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
})

// 移除事件监听器
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})

function toggleRecording() {
  isRecording.value = !isRecording.value
  if (!isRecording.value) {
    // 停止记录时清空当前按键
    pressedKeys.value = []
  }
}

function clearRecordedKeys() {
  recordedKeys.value = []
}
</script>

<template>
  <div class="container">
    <!-- 标题和操作按钮 -->
    <div class="flex justify-between items-center mb-14">
      <h2 class="text-3xl font-bold">
        键盘按键检测
      </h2>
      <div class="flex gap-2">
        <button
          class="px-4 py-2 rounded-lg transition-colors"
          :class="{
            'bg-blue-500 text-white hover:bg-blue-600': !isRecording,
            'bg-red-500 text-white hover:bg-red-600': isRecording,
          }"
          @click="toggleRecording"
        >
          {{ isRecording ? '停止记录' : '开始记录' }}
        </button>
        <button
          v-if="recordedKeys.length > 0"
          class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          @click="clearRecordedKeys"
        >
          清除记录
        </button>
      </div>
    </div>

    <!-- 当前按键显示 -->
    <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
      <p class="text-2xl text-gray-700 text-center">
        当前按下：
        <span
          v-if="pressedKeys.length > 0"
          class="font-bold text-blue-500"
        >
          {{ pressedKeys.join(' + ') }}
        </span>
        <span v-else class="text-gray-400">无</span>
      </p>
    </div>

    <!-- 记录模式下的按键显示 -->
    <div
      v-if="recordedKeys.length > 0"
      class="bg-white rounded-xl shadow-lg p-8 mb-8 max-h-[60vh] overflow-y-auto recorded-keys-container"
    >
      <p class="text-2xl text-gray-700 text-center mb-4">
        已记录按键：
      </p>
      <div class="">
        <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div
            v-for="(key, index) in recordedKeys"
            :key="index"
            class="bg-gray-50 rounded-xl shadow-sm p-4"
          >
            <div class="text-2xl font-bold text-gray-700 mb-1 text-center">
              {{ key }}
            </div>
            <div class="text-gray-500 text-sm text-center">
              按键 #{{ index + 1 }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 提示信息 -->
    <div
      v-if="!isRecording && recordedKeys.length === 0"
      class="text-center text-gray-500 py-12"
    >
      <p class="text-lg">
        请按下任意键盘按键
      </p>
    </div>
  </div>
</template>
