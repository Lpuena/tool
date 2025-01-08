<script lang="ts" setup>
// 工具数据
const codeTools = [
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
    name: '图片转 base64',
    description: '将图片转换为 base64 编码',
    icon: 'i-carbon-image',
    link: '/imageToBase64View',
  },
  {
    name: '图片压缩',
    description: '压缩图片并优化文件大小',
    icon: 'i-carbon-image-copy',
    link: '/imageCompressView',
  },
]

const peripheralTools = [
  {
    name: '鼠标按键检测',
    description: '实时检测鼠标按键点击',
    icon: 'i-ph-mouse',
    link: '/mouseClickView',
  },
  {
    name: '键盘按键检测',
    description: '实时检测键盘按键输入',
    icon: 'i-ph-keyboard',
    link: '/keyboardView',
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
    <ToolSection
      title="代码工具"
      :tools="codeTools"
    />
    <ToolSection
      title="外设工具"
      :tools="peripheralTools"
    />
  </div>
</template>

<style scoped>
/* 自定义按钮样式 */
</style>
