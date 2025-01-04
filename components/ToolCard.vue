<script lang="ts" setup>
defineProps<{
  tool: {
    name: string
    description: string
    icon: string
    link: string
  }
}>()

const router = useRouter()
</script>

<template>
  <div
    class="cursor-pointer bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    @click="router.push(tool.link)"
  >
    <div class="text-5xl mb-8 text-blue-500" :class="tool.icon" />
    <h3 class="text-2xl font-bold text-gray-900 mb-4">
      {{ tool.name }}
    </h3>
    <p class="text-gray-600 mb-6">
      {{ tool.description }}
    </p>
  </div>
</template>
