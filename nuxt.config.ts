// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // '@nuxt/eslint',
    '@unocss/nuxt',
  ],
  // eslint: {
  //   config: {
  //     standalone: false
  //   }
  // },
  css: [
    '@unocss/reset/tailwind.css',
  ],
  app: {
    baseURL: '/tool/',
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  devtools: { enabled: true },
  compatibilityDate: '2025-01-03',
})
