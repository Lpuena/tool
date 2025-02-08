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
        { rel: 'icon', type: 'image/x-icon', href: '/tool/favicon.ico' },
      ],
    },
  },
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: false, // 禁用路由抓取
      routes: [], // 明确指定需要预渲染的路由
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-01-03',
})
