// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // '@nuxt/eslint',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
  ],
  // eslint: {
  //   config: {
  //     standalone: false
  //   }
  // },
  css: [
    '@unocss/reset/tailwind.css',
  ],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },
  app: {
    baseURL: '/tool/',
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/CarbonCode.png' },
      ],
    },
  },
  nitro: {
    // preset: 'cloudflare-pages',
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-01-03',
})
