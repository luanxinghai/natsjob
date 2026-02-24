/**
 * 根据路由处理滚动行为
 */
import { nextTick } from 'vue'
import { useTabsStore } from '@/stores/useTabsStore.js'

export function beforeEach(to, from) {
  var adminMain = document.querySelector('#scrm-main')
  if (!adminMain) {
    return false
  }

  let tabsStore = useTabsStore()
  // console.log("测试滚动轴",{
  //   fullPath: from.fullPath,
  //   scrollTop: adminMain.scrollTop,
  // })
  tabsStore.updateViewTags({
    fullPath: from.fullPath,
    scrollTop: adminMain.scrollTop,
  })
}

export function afterEach(to) {
  var adminMain = document.querySelector('#scrm-main')
  if (!adminMain) {
    return false
  }
  nextTick(() => {
    //adminMain.scrollTop = 0
    let tabsStore = useTabsStore()
    var beforeRoute = tabsStore.menuTabs.filter((v) => v.path == to.fullPath)[0]
    if (beforeRoute) {
      adminMain.scrollTop = beforeRoute.scrollTop || 0
    } else {
      adminMain.scrollTop = 0
    }
  })
}
