<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
    <!-- 导航栏 -->
    <AppHeader class="sticky top-0 z-50" />

    <!-- 主要内容 -->
    <main class="flex-1 overflow-auto bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <slot />
      </div>
    </main>
    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<style></style>
