// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    NUXT_SECRET: process.env.NUXT_SECRET,
    STRAPI_BASE_URL: process.env.STRAPI_BASE_URL,
    STRAPI_APITOKEN_SECRET:process.env.STRAPI_APITOKEN_SECRET
  },
  css: ["@fortawesome/fontawesome-free/css/all.min.css"],
  modules: ['@nuxt/devtools', "@nuxtjs/tailwindcss", "@sidebase/nuxt-auth"],
  auth: {
    origin: process.env.ORIGIN,
  },
});
