// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //  typescript: {

  //   typeCheck: true

  // },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css'
  ],
  app: {
    head: {
      title: 'Mi Tienda de Servicios',
      meta: [
        {
          name: 'description',
          content: 'Bienvenido a mi tienda de servicios generales.',
        }
      ]
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@prisma/nuxt',
    'nuxt-auth-utils',
  ],
  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    }
  },
  //Prerender - Todo el sitio
  nitro: {
    prerender: {
      routes: ['/', '/about', '/contact', '/pricing', '/products'],
      ignore: ['/dashboard', '/dashboard/**'],
      //habilitar el crawling para descubrir enlaces automáticamente
      crawlLinks: true,
    },
  },

  //SPA - SINGLE PAGE APLICATION
  // ssr: false,
  // nitro: {
  //   preset: 'static',
  //   static: true,
  // },
})