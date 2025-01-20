<script lang="ts" setup>
const { showMessage } = useMessage()

// 定义鼠标点击次数
const clickCounts = ref([
  { id: 'left', label: '左键', count: 0, color: 'text-blue-500' },
  { id: 'middle', label: '中键', count: 0, color: 'text-purple-600' },
  { id: 'right', label: '右键', count: 0, color: 'text-pink-600' },
])

const buttonMap = {
  0: 'left',
  1: 'middle',
  2: 'right',
} as const // 使用 as const 确保类型推断为字面量类型

// 当前点击的按键
const currentButton = ref('')
// 添加上次点击时间记录
const lastClickTime = ref(0)

function handleMouseDown(event: MouseEvent) {
  const now = Date.now()

  // 检测双击问题（150ms内连续点击）
  if (now - lastClickTime.value < 150) {
    showMessage('error', '可能存在双击问题')
    return
  }

  lastClickTime.value = now

  const button = buttonMap[event.button as keyof typeof buttonMap]
  if (button) {
    const buttonData = clickCounts.value.find(item => item.id === button)
    if (buttonData) {
      buttonData.count++
      currentButton.value = buttonData.label
    }
  }
}

function clearCounts() {
  clickCounts.value.forEach((item) => {
    item.count = 0
  })
  currentButton.value = ''
  showMessage('success', '已清空点击次数')
}
</script>

<template>
  <div>
    <div class="flex flex-col items-center justify-center">
      <h2 class="mb-14 text-3xl font-bold">
        鼠标按键检测
      </h2>
    </div>

    <div class="grid grid-cols-2 gap-5">
      <!-- 左侧区域 -->
      <div>
        <!-- 当前点击显示 -->
        <div
          class="mb-4 border border-gray-200 rounded-lg bg-white p-6"
          dark="dbg dbr"
        >
          <p class="text-xl text-gray-600">
            当前点击：<span class="textCol">{{ currentButton || '无' }}</span>
          </p>
        </div>

        <!-- 点击统计 -->
        <div class="grid grid-cols-1 gap-4">
          <div
            v-for="button in clickCounts"
            :key="button.id"
            class="border border-gray-200 rounded-xl bg-white p-6"
            dark="dbg dbr"
          >
            <div class="mb-2 text-3xl font-bold" :class="[button.color]">
              {{ button.count }}
            </div>
            <div class="text-gray-600">
              {{ button.label }}点击次数
            </div>
          </div>
        </div>
        <!-- 添加清空按钮 -->
        <button class="mt-4 btn" @click="clearCounts">
          清空
        </button>
      </div>

      <!-- 右侧区域 -->
      <div class="relative overflow-y-auto">
        <!-- 点击区域 -->
        <div
          class="h-[72vh] cursor-pointer select-none border border-gray-200 rounded-lg bg-white p-8 text-center transition-all duration-200 hover:shadow-lg"
          dark="dbg dbr"
          @mousedown="handleMouseDown"
          @contextmenu.prevent
        >
          <p
            class="text-lg text-gray-600 font-medium"
            dark="text-gray-200"
          >
            请在此区域点击鼠标
          </p>
          <p class="mt-2 text-sm text-gray-400">
            （左键/中键/右键均可）
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
