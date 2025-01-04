<script lang="ts" setup>
const router = useRouter()
// 工具数据
const tools = [
  {
    name: 'VsCode 代码转换',
    description: '将代码转换为VSCode代码片段',
    icon: 'i-carbon-code',
    link: '/pageChangeView',
  },
  {
    name: 'JSON 转 TypeScript',
    description: '将 JSON 数据转换为 TypeScript 类型',
    icon: 'i-carbon-tool-kit',
    link: '/jsonToTsView',
  },
  {
    name: '工具3',
    description: '更多工具功能',
    icon: 'i-carbon-tools',
    link: '#',
  },
]
</script>

<template>
  <div>
    <!-- 欢迎区域 -->
    <div class="max-w-3xl mx-auto text-center mb-20">
      <h2 class="text-5xl font-bold text-gray-900 mb-8">
        欢迎使用工具网站
      </h2>
      <p class="text-xl text-gray-600 mb-12">
        这是一个使用 Nuxt 和 UnoCSS 构建的现代化工具网站。
      </p>
      <!-- <button
        class="btn bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        开始使用
      </button> -->
    </div>

    <!-- 工具展示 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 h-full">
      <div
        v-for="tool in tools" :key="tool.name"
        class="cursor-pointer bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        @click="router.push(tool.link)"
      >
        <div class="text-6xl mb-8 text-blue-500" :class="tool.icon" />
        <h3 class="text-2xl font-bold text-gray-900 mb-4">
          {{ tool.name }}
        </h3>
        <p class="text-gray-600 mb-6">
          {{ tool.description }}
        </p>
        <!-- <a :href="tool.link" class="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors">
          了解更多
          <span class="i-carbon-arrow-right ml-2" />
        </a> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 自定义按钮样式 */
</style>
