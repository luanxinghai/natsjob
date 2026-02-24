import { createApp } from "vue"
import App from "./App.vue"
import mainApp from "./main-app"

import ElementPlus from "element-plus"
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import "element-plus/dist/index.css"
import router from "./router"
import { createPinia } from "pinia"

import "virtual:svg-icons-register"
import "remixicon/fonts/remixicon.css"

const app = createApp(App)

app.use(mainApp)
app.use(router)
app.use(createPinia())
app.use(ElementPlus, {
  size: "default",
  zIndex: 3000,
  locale: zhCn,
})

app.mount("#app")
