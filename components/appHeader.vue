<script lang="ts" setup>
const colorMode = useColorMode()
const router = useRouter()
function goHome() {
  router.push('/')
}

const isDark = computed(() => colorMode.value === 'dark')
</script>

<template>
  <header
    class="border-b border-gray-200/50 backdrop-blur-[4px] transition-colors duration-300"
    dark="border-gray-700/50"
    :class="{ headerLight: !isDark, headerDark: isDark }"
  >
    <div class="mx-auto px-4 container lg:px-8 sm:px-6">
      <div class="h-15 flex items-center justify-between">
        <!-- Logo and Title -->
        <div class="flex cursor-pointer items-center space-x-3" @click="goHome">
          <div alt="Logo" class="i-carbon-code h-14 w-14 from-blue-600 to-purple-600 bg-gradient-to-r" />
          <h1 class="from-blue-600 to-purple-600 bg-gradient-to-r bg-clip-text text-2xl text-transparent font-bold italic dark:from-blue-400 dark:to-purple-400">
            Tools
          </h1>
        </div>

        <!-- Dark Mode Toggle -->
        <DarkTroggle />
      </div>
    </div>
  </header>
</template>

<style>
/* 定义颗粒感背景 */
.headerLight {
  background-image: radial-gradient(transparent 1px, rgba(255, 255, 255, 0.8) 1px);
  background-size: 4px 4px;
}

.headerDark {
  background-image: radial-gradient(transparent 1px, rgba(34, 34, 34, 0.8) 1px);
  background-size: 4px 4px;
}
</style>
