const rootMenu = [
  {
    name: "layout",
    path: "/",
    component: () => import("@/layout/Home.vue"),
    redirect: "/WorkBench",
    children: [],
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/layout/login/login.vue"),
    meta: {
      title: "登录",
    },
  },
]

const childrenMenu = []

const insertRoute = (pagePath, params) => {
  const componentPath =
    pagePath.replace("/src/views", "").replace("/page.js", "") || "/"
  let comPath = `../views${componentPath}/${params.component}.vue`
  let component = compModules[comPath]
  if (component == null || component == undefined) {
    console.error(
      `组件路径${comPath}未能找到,不加入路由. 路径:${pagePath},参数:${JSON.stringify(params)}`,
    )
    return
  }
  childrenMenu.push({
    path: params.path,
    name: params.name,
    component: component,
    meta: params.meta,
    children: params.children,
  })
}
const pageModules = import.meta.glob("@/views/**/page.js", { eager: true })
const compModules = import.meta.glob("../views/**/*.vue")
const pages = Object.entries(pageModules).map(([pagePath, pageModule]) => {
  let pageModuleDefault = pageModule.default || {}
  if (Array.isArray(pageModuleDefault)) {
    pageModuleDefault.map((item) => {
      insertRoute(pagePath, item)
    })
  } else {
    insertRoute(pagePath, pageModuleDefault)
  }
})
console.log(childrenMenu)
export const getMenu = () => {
  return childrenMenu
}

rootMenu[0].children = childrenMenu
export default rootMenu
