// https://nuxt.com/docs/api/configuration/nuxt-config
const styleFiles = (path: String) => {
  const fs = require('fs')
  const files = fs.readdirSync(path)
  return files.map((i:any) => path + i)
}

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-lodash',
    '@pinia/nuxt',
    "@nuxt/image"
  ],
  imports: {
    dirs: [
      'composables',
      'composables/**', 
      'constants/**'],
  },
  css: [
    '~/assets/styles/main.sass',
    '~/assets/styles/transitions.sass'
  ],
})