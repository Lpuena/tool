// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
  ],

  css: [
    '@unocss/reset/tailwind.css',
  ],

  devtools: { enabled: true },
  compatibilityDate: '2025-01-03'
})