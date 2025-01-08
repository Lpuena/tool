<script lang="ts" setup>
const router = useRouter()
function goHome() {
  router.push('/')
}
</script>

<template>
  <header class="border-b border-gray-200/50 backdrop-blur-[4px] bg-grid">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-17 items-center justify-between">
        <div class="flex items-center space-x-3 cursor-pointer" @click="goHome()">
          <div alt="Logo" class="w-14 h-14 i-carbon-code bg-gradient-to-r from-blue-600 to-purple-600" />
          <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-italic">
            Tools
          </h1>
        </div>
        <!-- <nav class="hidden md:flex space-x-6">
          <a
            href="#"
            class="relative text-gray-500 hover:text-gray-900 transition-colors duration-300 group"
          >
            首页
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#" class="relative text-gray-500 hover:text-gray-900 transition-colors duration-300 group">
            工具
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#" class="relative text-gray-500 hover:text-gray-900 transition-colors duration-300 group">
            关于
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
          </a>
        </nav> -->
      </div>
    </div>
  </header>
</template>

<style scoped>
.bg-grid {
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.3) 0,
    rgba(255, 255, 255, 0.3) 2px,
    transparent 2px,
    transparent 4px
  );
}
</style>
