export default {
  head: {
    title: "todoListApp",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap",
      },
    ],
  },

  css: [
    "ant-design-vue/dist/antd.css",
    "./assets/styles/variables.scss",
    "./assets/styles/main.scss",
  ],

  plugins: ["@/plugins/antd-ui"],

  components: true,

  buildModules: ["@nuxt/typescript-build"],

  modules: [],

  build: {
    src: "nuxt.config.js",
    use: "@nuxtjs/vercel-builder",
    config: {
      outputDir: "dist",
    },
  },
};
