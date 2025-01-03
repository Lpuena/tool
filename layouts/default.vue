<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
    <!-- 导航栏 -->
    <AppHeader />

    <!-- 主要内容 -->
    <slot />

    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<style>
/* 自定义按钮样式 */
.btn {
  @apply transition-all duration-200 transform hover:scale-105 active:scale-95;
}
</style>
