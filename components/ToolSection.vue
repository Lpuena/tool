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
    <h3 class="mb-8 text-3xl font-bold">
      {{ title }}
    </h3>
    <div class="grid grid-cols-1 h-full gap-10 lg:grid-cols-3 sm:grid-cols-2">
      <ToolCard
        v-for="tool in tools"
        :key="tool.name"
        :tool="tool"
      />
    </div>
  </div>
</template>
