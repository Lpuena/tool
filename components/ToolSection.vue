<script lang="ts" setup>
defineProps<{
  title: string
  tools: Array<{
    name: string
    description: string
    icon: string
    link: string
  }>
}>()
</script>

<template>
  <div class="mb-20">
    <h3 class="text-3xl font-bold text-gray-900 mb-8">
      {{ title }}
    </h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 h-full">
      <ToolCard
        v-for="tool in tools"
        :key="tool.name"
        :tool="tool"
      />
    </div>
  </div>
</template>
