import { useRouter, useRoute } from "vue-router"
import { getMenu } from "@/router/route"
let menuRoute = getMenu()
const routes_404 = {
  path: "/:pathMatch(.*)*",
  hidden: true,
  component: () => import("@/layout/components/error/404.vue"),
}

export const loadMenu = async () => {
  const router = useRouter()

  const menuSelf = [
    {
      path: "/namespace/list",
      name: "NsList",
      url: "NsList",
      component: "NsList",
      icon: "ri-blaze-line",
      menuName: "命名空间",
    },
    {
      path: "/app/list",
      name: "AppList",
      url: "AppList",
      component: "AppList",
      icon: "ri-typhoon-line",
      menuName: "服务任务",
    },
  ]
  let myMenu = setMenu(menuSelf)
  let menuRouter = flatAsyncRoutes(myMenu)
  console.log("route menu add", menuRouter)
  menuRouter.forEach((item) => {
    router.addRoute("layout", item)
  })

  router.addRoute("layout", routes_404)
  return myMenu
}

function flatAsyncRoutes(routes) {
  let res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (tmp.children) {
      let tmpRoute = { ...route }

      delete tmpRoute.children
      res.push(tmpRoute)
      let childrenRoutes = flatAsyncRoutes(tmp.children)
      childrenRoutes.map((item) => {
        res.push(item)
      })
    } else {
      res.push(tmp)
    }
  })
  return res
}

let RviewCnt = 0
let setMenu = (menuSelf) => {
  let myMenu = []
  menuSelf.map((item) => {
    RviewCnt++
    let ms = getMenuName(item.url)
    if (!ms.component) {
      return
    }

    let child = []
    if (item.children && item.children.length > 0) {
      child = setMenu(item.children)
    }

    let cMenu = {
      name: ms.name,
      path: ms.path,
      meta: {
        ifont: item.icon,
        title: item.menuName,
        keepAlive: item.keepAlive == "0",
        type: item.type ?? "menu",
        affix: ms?.meta?.affix ?? false,
        closeTag: ms?.meta?.closeTag ?? true,
      },
      children: child,
      component: ms.component,
    }
    myMenu.push(cMenu)
  })
  return myMenu
}

const Com404 = {
  path: "/Com404",
  name: "Com404",
  component: () => import("@/layout/components/error/404.vue"),
}
const TempRviewComponent = () => import("@/layout/components/TempRview.vue")
const TempRview = {
  path: "/TempRview",
  name: "TempRview",
  component: TempRviewComponent,
}

let getMenuName = (name) => {
  let menuName
  if (name.startsWith("TempRviewRoute")) {
    menuName = {
      component: TempRviewComponent,
      path: "/" + name,
      name: name,
    }

    return menuName
  }

  if (name == "TempRview") {
    menuName = {
      component: TempRviewComponent,
      path: "/" + name + RviewCnt,
      name: name + RviewCnt,
    }

    return menuName
  }

  menuRoute.map((item) => {
    if (item.name === name) {
      menuName = item
      return menuName
    }
  })

  if (menuName == undefined) {
    menuName = {
      component: Com404.component,
      path: "/" + name + "Com404",
      name: name + "Com404",
    }
  }

  return menuName
}
