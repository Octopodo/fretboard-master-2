// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-lodash',
    '@pinia/nuxt',
  ],
  imports: {
    dirs: ['composables/**', 'constants/**'],
  },
  css: ['~/assets/styles/main.sass'],
})
