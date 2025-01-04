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
    buildAssetsDir: '/_nuxt/',
  },
  runtimeConfig: {
    public: {
      baseURL: '/tool/'
    }
  },
  nitro: {
    prerender: {
      crawlLinks: false, // 禁用路由抓取
      routes: [], // 明确指定需要预渲染的路由
    },
  },

  devtools: { enabled: true },
  compatibilityDate: '2025-01-03',
})
