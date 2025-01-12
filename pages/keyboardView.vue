<script lang="ts" setup>
// 键盘类型
const keyboardType = ref<'mac' | 'win'>('win')

const { winKeyboardLayout, macKeyboardLayout } = useKeyboards()

// 当前键盘布局
const keyboardLayout = computed(() => {
  return keyboardType.value === 'win' ? winKeyboardLayout : macKeyboardLayout
})

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

  let key = event.key === ' ' ? 'Space' : event.key
  // 统一处理字母键为大写
  if (/^[a-z]$/i.test(key)) {
    key = key.toUpperCase()
  }
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

  let key = event.key === ' ' ? 'Space' : event.key
  // 统一处理字母键为大写
  if (/^[a-z]$/i.test(key)) {
    key = key.toUpperCase()
  }
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
</script>

<template>
  <div class="container">
    <!-- 标题 -->
    <h2 class="text-3xl font-bold text-center mb-8">
      键盘按键检测
    </h2>

    <!-- 切换按钮 -->
    <div class="flex justify-end mb-4">
      <div class="relative w-24 h-12 bg-white rounded-full shadow-lg p-1">
        <div
          class="absolute top-1 left-1 w-10 h-10 bg-gray-100 rounded-full transition-all duration-300"
          :class="{
            'translate-x-0': keyboardType === 'win',
            'translate-x-12': keyboardType === 'mac',
          }"
        />
        <div
          class="absolute top-1 left-1 w-10 h-10 flex items-center justify-center cursor-pointer"
          @click="keyboardType = 'win'"
        >
          <div class="i-qlementine-icons-windows-16 text-xl text-gray-600" />
        </div>
        <div
          class="absolute top-1 right-1 w-10 h-10 flex items-center justify-center cursor-pointer"
          @click="keyboardType = 'mac'"
        >
          <div class="i-qlementine-icons-mac-16 text-xl text-gray-600" />
        </div>
      </div>
    </div>

    <!-- 键盘布局显示 -->
    <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div class="keyboard-grid">
        <div
          v-for="(row, rowIndex) in keyboardLayout"
          :key="rowIndex"
          class="keyboard-row"
        >
          <div
            v-for="(key, keyIndex) in row"
            :key="keyIndex"
            class="keyboard-key"
            :class="{
              'keyboard-key--pressed': pressedKeys.includes(typeof key === 'string' ? key : key.key),
              'keyboard-key--special': typeof key !== 'string',
            }"
            :style="{ width: typeof key === 'object' ? `${key.width}px` : '' }"
          >
            {{ typeof key === 'string' ? key : key.key }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.keyboard-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 1000px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.keyboard-row {
display: flex;
gap: 8px;
}

.keyboard-key {
display: flex;
align-items: center;
justify-content: center;
min-width: 60px;
height: 60px;
padding: 0 16px;
background-color: #f3f4f6;
border-radius: 12px;
font-size: 16px;
font-weight: 500;
color: #374151;
transition: all 0.2s ease;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
cursor: pointer;
user-select: none;
}

.keyboard-key:hover {
background-color: #e5e7eb;
}

.keyboard-key--pressed {
background-color: #3b82f6;
color: white;
transform: scale(0.95);
box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
}

.keyboard-key--special {
background-color: #e5e7eb;
font-size: 15px;
}
</style>
