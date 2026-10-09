import { defineConfig, lazyPlugins } from "vite-plus";
import vue from "@vitejs/plugin-vue"
import path from "path"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { IduxResolver } from "unplugin-vue-components/resolvers"
import {
  ElementPlusResolver,
  NaiveUiResolver,
} from "unplugin-vue-components/resolvers"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import ViteImages from "vite-plugin-vue-images"
import VueSetupExtend from "vite-plugin-vue-setup-extend"
import vueJsx from "@vitejs/plugin-vue-jsx"

export default defineConfig({
  // Vite+ 格式检查配置
  fmt: {
    printWidth: 130,
    tabWidth: 2,
    useTabs: true,
    semi: false,
    singleQuote: false,
    quoteProps: "as-needed",
    bracketSpacing: true,
    trailingComma: "none",
    jsxSingleQuote: false,
    arrowParens: "always",
    proseWrap: "preserve",
    htmlWhitespaceSensitivity: "css",
    vueIndentScriptAndStyle: false,
    sortPackageJson: false,
    ignorePatterns: [
      "/dist/*",
      ".local",
      ".output.js",
      "/node_modules/**",
      "**/*.svg",
      "**/*.sh",
      "/public/*",
      "src/components.d.ts",
      "src/auto-imports.d.ts",
    ],
  },
  // Vite+ lint（Oxlint）配置
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "off" },
    options: { typeAware: true, typeCheck: true },
    ignorePatterns: ["src/components.d.ts", "src/auto-imports.d.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      api: path.resolve(__dirname, "src/api"),
      app: path.resolve(__dirname, "src/app"),
      components: path.resolve(__dirname, "src/components"),
      style: path.resolve(__dirname, "src/style"),
      views: path.resolve(__dirname, "src/views"),
      layout: path.resolve(__dirname, "src/layout"),
      utils: path.resolve(__dirname, "src/utils"),
      hooks: path.resolve(__dirname, "src/hooks"),
      router: path.resolve(__dirname, "src/router"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },

    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
      },
    },
  },

  plugins: lazyPlugins(() => [
    vue(),
    vueJsx(),
    AutoImport({
      dts: "src/auto-imports.d.ts",
      imports: ["vue", "pinia", "vue-router", "@vueuse/core"],
      resolvers: [
        ElementPlusResolver(),
        NaiveUiResolver(),
        IduxResolver({ importStyle: "css", importStyleTheme: "default" }),
      ],
    }),
    Components({
      dts: "./src/components.d.ts",
      extensions: ["vue", "tsx"],
      dirs: ["src/components/", "src/layout/", "src/views/"],
      resolvers: [ElementPlusResolver(), NaiveUiResolver()],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
    ViteImages({
      dirs: ["src/assets/image"],
      extensions: ["jpg", "jpeg", "png", "svg", "webp"],
    }),
    VueSetupExtend(),
  ]),
  // publicDir: "",
  base: "./",
  server: {
    port: 6600,
    open: true,
    cors: true,
    proxy: {
      "^/(natsjob)/*.": {
        target: "http://127.0.0.1:7788/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/", "/"),
      },
    },
  },
})
