require("dotenv").config();
import colors from "vuetify/es5/util/colors";

const description = "";
const title = "";
const url = "";

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  router: {
    base: "/dashboard"
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // titleTemplate: "%s - dashboard-example",
    title: title,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },

      { hid: "twitter-card", name: "twitter:card", content: "summary" },
      { hid: "og-type", property: "og:type", content: "website" },
      {
        hid: "description",
        name: "description",
        content: `${description}`
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: `${description}`
      },
      {
        hid: "og:description",
        property: "og:description",
        content: `${description}`
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: `${title}`
      },
      { hid: "og:title", property: "og:title", content: `${title}` },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: `${url}`
      },
      { hid: "og-image", property: "og:image", content: `${url}` }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        href:
          "https://fonts.googleapis.com/css2?family=Changa+One:ital@0;1&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
        rel: "stylesheet"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/styles.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/vuelidate",
    "@/plugins/repository",
    { src: "@/plugins/session", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "cookie-universal-nuxt"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/axios"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en"
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/vuetify-variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    baseURL: process.env.BASE_URL
  }
};
