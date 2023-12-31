// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-lodash',
    '@pinia/nuxt',
    '@nuxt/image',
  ],
  imports: {
    dirs: ['composables', 'composables/**', 'constants/**'],
  },
  css: [
    '~/assets/styles/main.sass',
    '~/assets/styles/transitions.sass',
    '~/assets/styles/fretboard.sass',
  ],
  sourcemap: {
    server: true,
    client: true,
  },
})
