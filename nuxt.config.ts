// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY,
    },
  },
  ssr: false,
  app: {
    baseURL: process.env.NODE_ENV === "production" ? "/vue-posts/" : "/",
  },
  nitro: {
    preset: "static",
  },
});
