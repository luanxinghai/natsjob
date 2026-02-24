import { createRouter, createWebHashHistory } from "vue-router"
import { ElNotification } from "element-plus"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import routes from "./route"
import { beforeEach, afterEach } from "./scrollBehavior"

console.log("createRouter", routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

document.title = window?.$config?.app_name ? $config?.app_name : "SCRM"

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  let myTitle =
    to.meta?.title ?? `${to.meta.title}` ?? `${window?.$config?.app_name}`
  if (myTitle && myTitle != "undefined") {
    document.title = myTitle
    sessionStorage.setItem("scrm_title", myTitle)
  } else {
    document.title = sessionStorage.getItem("scrm_title")
  }

  if (to.path === "/login") {
    router.addRoute(routes[0])
    next()
    return false
  }

  if (!sessionStorage.getItem("token")) {
    next({
      path: "/login",
    })
    return false
  }
  if (to.meta.fullpage) {
    to.matched = [to.matched[to.matched.length - 1]]
  }
  beforeEach(to, from)
  next()
})

router.afterEach((to, from) => {
  afterEach(to, from)
  NProgress.done()
})

router.onError((error) => {
  NProgress.done()
  ElNotification.error({
    title: "route error",
    message: error.message,
  })
})

export default router
