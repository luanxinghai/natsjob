import { defineStore } from "pinia"

export const useTabsStore = defineStore("useTabsStore", {
  state: () => {
    return {
      menuTabskl: ["Home", "WorkBench", "UserSetting"],
      menuTabsKeeplive: ["Home", "WorkBench", "UserSetting"],
      menuTabs: [
        {
          meta: {
            ifont: "ri-home-smile-2-line",
            title: "工作台",
            keepAlive: true,
            ifont: "",
            affix: true,
            closeTag: false,
          },
          name: "WorkBench",
          path: "/WorkBench",
        },
      ],
      iframeTabs: [],
      activeTabs: "",
      viewTags: [],
      routeShow: true,
    }
  },
  actions: {
    addMenuTabs(menuRoute) {
      console.log("获取菜单,", menuRoute.name, menuRoute.query, menuRoute.meta)
      if (menuRoute.name == "" || menuRoute.name == "login") {
        return
      }

      let menuRouteNew = {
        name: menuRoute.name,
        path: menuRoute.path,
        meta: menuRoute.meta,
        query: menuRoute.query,
        params: menuRoute.params,
      }
      let isHas = this.menuTabs.find((item) => item.name == menuRoute.name)
      // console.log("获取菜单,isHas", isHas, !!isHas)
      // console.log("获取菜单,isHas this.menuTabs", this.menuTabs)
      if (!!isHas) {
        //有可能query已经发生变化,替换query参数,防止多次点击同一个路由,但是参数变化时,不重新加载页面
        this.menuTabs = this.menuTabs.map((item) => {
          if (item.name == menuRoute.name) {
            Object.keys(menuRouteNew).forEach((key) => {
              item[key] = menuRouteNew[key]
            })
            //item = menuRouteNew
          }
          return item
        })
      } else {
        this.menuTabs.push(menuRouteNew)
      }
      console.log("this.menuTabs", this.menuTabs)
      if (menuRoute.meta.type === "menu") {
        // console.log("addTab增加路由", menuRoute.name)
        if (
          !this.menuTabsKeeplive.includes(menuRoute.name) &&
          menuRoute.meta.keepAlive == true
        ) {
          this.menuTabsKeeplive.push(menuRoute.name)
        }
      } else if (menuRoute.meta.type === "iframe") {
        this.iframeTabs.push(menuRoute)
      }
    },
    removeViewTags(route) {
      this.menuTabs.forEach((item, index) => {
        if (item.name == route.name) {
          this.menuTabs.splice(index, 1)
        }
      })
      //console.log('剩余菜单', this.menuTabs)
    },
    addIframeTabs(menuRoute) {
      this.iframeTabs.push(menuRoute)
    },
    setActiveTabs(name) {
      this.activeTabs = name
    },
    updateViewTags(route) {
      this.menuTabs.forEach((item) => {
        if (item.path == route.fullPath) {
          item = Object.assign(item, route)
        }
      })
    },
    updateViewTagsTitle(title = "") {
      const nowFullPath = location.hash.substring(1)
      this.menuTabs.forEach((item) => {
        if (item.fullPath == nowFullPath) {
          item.meta.title = title
        }
      })
    },
    pushMenuTabsKeeplive(name) {
      console.log("增加了.....", name)
      if (!this.menuTabsKeeplive.includes(name)) {
        this.menuTabsKeeplive.push(name)
      }
    },
    //移除特殊不在默认缓存内的卡片
    removeMenuKeeplive(name) {
      if (this.menuTabskl.includes(name)) {
        return
      }
      var index = this.menuTabsKeeplive.indexOf(name)
      if (index !== -1) {
        this.menuTabsKeeplive.splice(index, 1)
      }
    },
    //用于刷新页面使用,移除指定卡片
    removeMenuTabsKeeplive(name) {
      var index = this.menuTabsKeeplive.indexOf(name)
      if (index !== -1) {
        this.menuTabsKeeplive.splice(index, 1)
      }
    },

    setRouteShow(key) {
      this.routeShow = key
    },
  },
})
