// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    "nuxt-lodash",
    '@pinia/nuxt',
  ],
  imports: {
    dirs: [
      'composables/**',
      'constants/**'
    ]
  }
})
