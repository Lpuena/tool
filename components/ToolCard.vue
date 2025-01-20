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
    class="group transform cursor-pointer rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
    dark="bg-[#222] shadow-gray-700/50 hover:shadow-gray-700"
    @click="router.push(tool.link)"
  >
    <!-- Icon with a subtle hover effect -->
    <div
      class="mb-8 text-5xl text-blue-500 transition-transform duration-300 group-hover:scale-110"
      dark="text-blue-400"
      :class="tool.icon"
    />

    <!-- Title with a gradient hover effect -->
    <h3
      class="mb-4 text-2xl text-gray-900 font-bold transition-all duration-300 group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent"
      dark="text-gray-100"
    >
      {{ tool.name }}
    </h3>

    <!-- Description with a fade-in effect -->
    <p
      class="mb-6 text-gray-600 transition-opacity duration-300 group-hover:opacity-80"
      dark="text-gray-300"
    >
      {{ tool.description }}
    </p>
  </div>
</template>
