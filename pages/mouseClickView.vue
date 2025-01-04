<script lang="ts" setup>
const { showMessage } = useMessage()

// 定义鼠标点击次数
const clickCounts = ref({
  left: 0,
  right: 0,
  middle: 0,
})

function clearCounts() {
  clickCounts.value = {
    left: 0,
    right: 0,
    middle: 0,
  }
  currentButton.value = ''
  showMessage('success', '已清空点击次数')
}

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

  switch (event.button) {
    case 0:
      currentButton.value = '左键'
      clickCounts.value.left++
      break
    case 1:
      currentButton.value = '中键'
      clickCounts.value.middle++
      break
    case 2:
      currentButton.value = '右键'
      clickCounts.value.right++
      break
  }
}
</script>

<template>
  <div>
    <div class="flex flex-col items-center justify-center">
      <h2 class="text-3xl font-bold mb-14">
        鼠标按键检测
      </h2>
    </div>

    <div class="grid grid-cols-2 gap-5">
      <!-- 左侧区域 -->
      <div>
        <!-- 当前点击显示 -->
        <div class="p-6 rounded-lg bg-white border border-gray-200 mb-4">
          <p class="text-xl text-gray-600">
            当前点击：<span class="font-bold text-blue-600">{{ currentButton || '无' }}</span>
          </p>
        </div>

        <!-- 点击统计 -->
        <div class="grid grid-cols-1 gap-4">
          <div class="bg-white border border-gray-200 p-6 rounded-xl">
            <div class="text-3xl font-bold text-blue-600 mb-2">
              {{ clickCounts.left }}
            </div>
            <div class="text-gray-600">
              左键点击次数
            </div>
          </div>
          <div class="bg-white border border-gray-200 p-6 rounded-xl">
            <div class="text-3xl font-bold text-purple-600 mb-2">
              {{ clickCounts.middle }}
            </div>
            <div class="text-gray-600">
              中键点击次数
            </div>
          </div>
          <div class="bg-white border border-gray-200 p-6 rounded-xl">
            <div class="text-3xl font-bold text-pink-600 mb-2">
              {{ clickCounts.right }}
            </div>
            <div class="text-gray-600">
              右键点击次数
            </div>
          </div>
        </div>
        <!-- 添加清空按钮 -->
        <button class="btn mt-4" @click="clearCounts">
          清空
        </button>
      </div>

      <!-- 右侧区域 -->
      <div class="overflow-y-auto relative">
        <!-- 点击区域 -->
        <div
          class="h-[72vh] p-8 rounded-lg bg-white border border-gray-200 text-center cursor-pointer select-none
                 transition-all duration-200 hover:shadow-lg"
          @mousedown="handleMouseDown"
          @contextmenu.prevent
        >
          <p class="text-gray-600 text-lg font-medium">
            请在此区域点击鼠标
          </p>
          <p class="text-sm text-gray-400 mt-2">
            （左键/中键/右键均可）
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
