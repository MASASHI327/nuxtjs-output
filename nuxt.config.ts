// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  srcDir: "src/",

  typescript: {
    typeCheck: true,
  },
  devServer: {
    port: 3000, 
    host: 'localhost',
  },
  modules: ["@nuxt/eslint", "@vesp/nuxt-fontawesome"],
});