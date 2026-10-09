import { createApp } from "vue"
import App from "./App.vue"
import mainApp from "./main-app"

// Element Plus 按需：组件与样式由 unplugin-vue-components + ElementPlusResolver 自动按需引入
// 此处仅保留基础变量/reset 样式（保证业务中 var(--el-*) 可用），不再全量注册
import "element-plus/theme-chalk/base.css"
import router from "./router"
import { createPinia } from "pinia"

import "virtual:svg-icons-register"
import "remixicon/fonts/remixicon.css"

const app = createApp(App)

app.use(mainApp)
app.use(router)
app.use(createPinia())
// 全局配置（locale/zIndex）已迁移到 App.vue 的 el-config-provider，按需模式不再全量注册

app.mount("#app")
