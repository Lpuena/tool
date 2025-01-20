<script setup lang="ts">
interface DataItem {
  diffFormat: string
  direction: 'up' | 'down'
  id: number
  time: number
  color: 'red' | 'green'
}

const { sub } = useMath()

/** 进入页面时间 */
const entryTime = ref(Date.now())

const firstDirection = ref<'up' | 'down'>('up')
const columns = ref<DataItem[][]>([[]])
const lastScrollTime = ref(0) // 记录上一次滚动时间
const SCROLL_INTERVAL_THRESHOLD = 500 // 滚动的时间阈值

function clearBtnClick() {
  columns.value = [[]] // 清空所有列
  lastScrollTime.value = 0 // 重置滚动时间记录
  entryTime.value = Date.now() // 重置进入页面时间
}
/** 新增滚动 */
function infiniteScroll(direction: 'up' | 'down') {
  // 鼠标滚动的当前时间
  const currentTime = Date.now()
  const timeDiff = sub(currentTime, entryTime.value) // 计算滚动时间间隔
  // console.log('当前时间:', currentTime, '上次滚动时间:', entryTime, '时间间隔:', timeDiff)
  const diffFormat = useDateFormat(timeDiff, 's.SSS') // 格式化时间间隔

  // 第一次滚动或当前滚动事件和上一次滚动事件超过一秒钟
  if (currentTime - lastScrollTime.value >= SCROLL_INTERVAL_THRESHOLD) {
    // 如果数组的最后一项中的长度大于等于1就新增
    const length = columns.value.length

    if (columns.value[length - 1].length >= 1)
      columns.value.unshift([])
  }
  const length = columns.value[0].length + 1
  // 第一次滚动
  if (length <= 1)
    firstDirection.value = direction

  // 判断后续的方向和第一次的方向是否相同,来决定颜色
  const newItem: DataItem = {
    diffFormat,
    direction,
    time: currentTime,
    id: length,
    color: firstDirection.value === direction ? 'green' : 'red',
  }
  // 新增一项到数组的0项
  columns.value[0].unshift(newItem)

  // 更新滚动时间记录
  lastScrollTime.value = currentTime
}

function handleScroll(event: WheelEvent) {
  infiniteScroll(event.deltaY > 0 ? 'down' : 'up')
}

onMounted(() => {
  // 当页面加载完毕后，绑定滚动事件到 window 对象
  window.addEventListener('wheel', handleScroll)
})

onUnmounted(() => {
  // 当页面卸载时，解绑之前的事件监听
  window.removeEventListener('wheel', handleScroll)
})
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h2 class="mb-14 text-3xl font-bold">
      鼠标滚轮检测
    </h2>
    <h1 class="text-center text-gray-500 italic">
      绿色表示鼠标滚动相同方向,红色表示相反方向
    </h1>
    <button class="my-4 btn" @click="clearBtnClick">
      Clear
    </button>
    <div
      class="mx-auto h-200 w-100% flex gap-2 overflow-hidden border border-gray-200 rounded-lg bg-white p-6"
      dark="dbg dbr"
    >
      <div v-for="(column, index) in columns" :key="index" class="flex flex-col gap-2">
        <div
          v-for="item in column"
          :key="item.id"
          class="h-12 w-35 flex items-center justify-between rounded bg-gray-500/5 p-3"
          :class="{ 'bg-green-500': item.color === 'green', 'bg-red-500': item.color === 'red' }"
        >
          {{ item.direction === 'up' ? '↑' : '↓' }}
          {{ item.id }}
          <span class="ml-2 text-xs text-white dark:text-gray-500">{{ item.diffFormat }} s</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
