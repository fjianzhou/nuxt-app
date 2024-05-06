// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: false },
  app: {
    head: {
      charset: "utf-8",
      title: "蒂莎编程",
      titleTemplate: "%s - 蒂莎编程",
      meta: [
        { name: "description", content: "蒂莎编程" },
        { name: "keywords", content: "蒂莎编程" },
      ],
      script: [
        // {
        //   src: "https://xxx.js",
        // },
      ],
      link: [
        // {
        //   rel: "stylesheet",
        //   href: "https://xxx.css",
        // },
      ],
    },
  },
  css: ["~/assets/global.scss", "~/assets/main.scss"],
  build: {
    transpile:
      process.env.NODE_ENV === "production"
        ? [
            "naive-ui",
            "vueuc",
            "@css-render/vue3-ssr",
            "@juggle/resize-observer",
          ]
        : ["@juggle/resize-observer"],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_variables.scss" as *;',
        },
      },
    },
    optimizeDeps: {
      include:
        process.env.NODE_ENV === "development"
          ? ["naive-ui", "vueuc", "date-fns-tz/formatInTimeZone"]
          : [],
    },
  },
  modules: ["@unocss/nuxt"],
  imports: {
    dirs: ["api"],
  },
});
