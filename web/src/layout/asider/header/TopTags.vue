<template>
  <div class="scrm-tags" ref="elTag">
    <div class="center tagMove-left" :style="setpScroll.left" @click="scrollInitAdd(true)">
      <i class="ri-arrow-left-s-line"></i>
    </div>
    <div style="width: calc(100% - 60px);">
      <ul ref="tagsRef">
        <li v-for="tag in tagList" v-bind:key="tag" :class="[
          isActive(tag) ? 'active' : '',
          tag.meta.affix ? 'affix' : '',
        ]" @contextmenu.prevent="openContextMenu($event, tag)">
          <router-link :to="tag">
            <span>{{ tag.meta.title }}</span>
            <el-icon v-if="tag.meta.closeTag" @click.prevent.stop="closeSelectedTag(tag)">
              <Close />
            </el-icon>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="center tagMove-right" :style="setpScroll.right" @click="scrollInitAdd(false)">
      <i class="ri-arrow-right-s-line"></i>
    </div>
  </div>

  <transition name="el-zoom-in-top">
    <ul v-if="contextMenuVisible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu" id="contextmenu">
      <li @click="refreshTab()">
        <el-icon>
          <Refresh />
        </el-icon>
        刷新当前
      </li>
      <hr />
      <li @click="closeTabs()" :class="contextMenuItem.meta.affix ? 'disabled' : ''">
        <el-icon>
          <Close />
        </el-icon>
        关闭标签
      </li>
      <li @click="closeOtherTabs()">
        <el-icon>
          <FolderDelete />
        </el-icon>
        关闭其他
      </li>
      <li @click="closeAllTabs">
        <el-icon>
          <CircleClose />
        </el-icon>
        关闭全部
      </li>

      <hr />
      <li @click="maximize()">
        <el-icon>
          <FullScreen />
        </el-icon>
        最大显示
      </li>
      <!-- <li @click="openWindow()">
        <el-icon><CopyDocument /></el-icon>
        在新的窗口中打开
      </li> -->
    </ul>
  </transition>
</template>

<script setup name="TopTags">
import Sortable from 'sortablejs'
import { useActiveRoutePath } from '@/router/routeWatch.js'
import { useTabsStore } from '@/stores/useTabsStore.js'
import { exitMinimize } from '@/utils/theme.js'
import { debounce } from '@/utils/tools.js'

const { activeRoutePath } = useActiveRoutePath()
const tabsStore = useTabsStore()
const route = useRoute()
const router = useRouter()

const contextMenuVisible = ref(false)
const contextMenuItem = ref(null)
const left = ref(0)
const top = ref(0)
const tagList = computed(() => tabsStore.menuTabs) //ref([]) // this.$store.state.viewTags.viewTags,
const tagsRef = ref(null)
const setpScroll = reactive({
  left: '',
  right: '',
})

onMounted(async () => {
  await nextTick()
  tagDrop()
  scrollInit()
  //如果刷新页面,生成环境中要重置到工作台
  if (import.meta.env.VITE_WORKBENCH != 1) {
    router.push('/')
  }
  if (tagList.length > 0) {
    contextMenuItem.value = tagList[0]
  }

})

/**
 * 是否当前选中菜单
 */
const isActive = (route) => {
  //console.log('isActive----', activeRoutePath.value, route.path)
  return activeRoutePath.value === route.path
  // route.fullPath === this.$route.fullPath
}

watch(route, (to, oldValue) => {

  // if (to.path.includes("HomeNew")) {
  //   return false
  // }
  // console.log("aaaaa", to.path, to.meta)
  tabsStore.addMenuTabs(to)
  //判断标签容器是否出现滚动条
  nextTick(() => {
    const tags = tagsRef.value
    if (tags && tags.scrollWidth > tags.clientWidth) {
      //确保当前标签在可视范围内
      try {
        let targetTag = tags.querySelector('.active')
        targetTag.scrollIntoView()
      } catch (error) {
        console.log(error)
      }
    }
  })
})

onMounted(() => {
  //console.log(route)
  if (import.meta.env.VITE_LOGIN_ACCPWD == 1) {
    if (route.meta.title != null && route.meta.title != '') {
      tabsStore.addMenuTabs(route)
    }
  }
})

// const addViewTags = (tag) => {
//   tabsStore.addMenuTabs(tag)
// }

watch(contextMenuVisible, (value) => {
  var cm = function (e) {
    let sp = document.getElementById('contextmenu')
    if (sp && !sp.contains(e.target)) {
      closeMenu()
    }
  }
  if (value) {
    document.body.addEventListener('click', (e) => cm(e))
  } else {
    document.body.removeEventListener('click', (e) => cm(e))
  }
})

const closeMenu = () => {
  contextMenuItem.value = null
  contextMenuVisible.value = false
}

/**
 * 右键显示菜单
 */
const openContextMenu = async (e, tag) => {
  contextMenuItem.value = tag
  contextMenuVisible.value = true
  left.value = e.clientX + 1
  top.value = e.clientY + 1

  await nextTick()
  let sp = document.getElementById('contextmenu')
  if (document.body.offsetWidth - e.clientX < sp.offsetWidth) {
    left.value = document.body.offsetWidth - sp.offsetWidth + 1
    top.value = e.clientY + 1
  }
}

/**
 * 滚动标签
 */
const scrollInit = () => {
  const scrollDiv = tagsRef.value
  scrollDiv.addEventListener('mousewheel', handler, false) ||
    scrollDiv.addEventListener('DOMMouseScroll', handler, false)
  function handler(event) {
    const detail = event.wheelDelta || event.detail
    //火狐上滚键值-3 下滚键值3，其他内核上滚键值120 下滚键值-120
    const moveForwardStep = 1
    const moveBackStep = -1
    let step = 0
    if (detail == 3 || (detail < 0 && detail != -3)) {
      step = moveForwardStep * 50
    } else {
      step = moveBackStep * 50
    }
    scrollDiv.scrollLeft += step
  }

  //设定左右箭头的方向问题
  scrollDiv.addEventListener('scroll', function () {
    setStepScroll()
  })
  setStepScroll()
}

const setStepScroll = async () => {
  // console.log('99999999999999999999')
  await nextTick()

  const scrollDiv = tagsRef.value
  let style = 'color: #ccc'
  // console.log(
  //   '滚动,',
  //   scrollDiv.scrollLeft,
  //   scrollDiv.clientWidth,
  //   scrollDiv.scrollWidth,
  // )
  if (Math.ceil(scrollDiv.clientWidth) == Math.ceil(scrollDiv.scrollWidth)) {
    setpScroll.left = style
    setpScroll.right = style
  } else if (scrollDiv.scrollLeft <= 0) {
    setpScroll.left = style
    setpScroll.right = ''
  } else if (
    Math.ceil(scrollDiv.scrollLeft + scrollDiv.clientWidth) >=
    scrollDiv.scrollWidth
  ) {
    setpScroll.right = style
    setpScroll.left = ''
  } else {
    setpScroll.left = ''
    setpScroll.right = ''
  }
}

//如果发生尺寸变化,重新计算图标
const elTag = ref()
let mySScroll = debounce(setStepScroll, 500)
useResizeObserver(elTag, (entries) => {
  mySScroll()
})

/**
 * 卡片左右移动
 */
const scrollInitAdd = (isLeft = false) => {
  const scrollDiv = tagsRef.value

  let step = 300
  let stepNum = 0,
    stepDefault = 10,
    stepValue = isLeft ? -stepDefault : stepDefault

  //滚动轴动画处理
  function addStep() {
    // console.log('执行,', stepNum)
    if (
      stepNum > step ||
      (isLeft && scrollDiv.scrollLeft <= 0) ||
      (!isLeft &&
        //计算滚动轴是否到最右侧了
        scrollDiv.scrollLeft + scrollDiv.clientWidth >= scrollDiv.scrollWidth)
    ) {
      stepNum = 0
      return
    }

    // setTimeout(() => {
    //   stepNum += stepDefault
    //   scrollDiv.scrollLeft += stepValue
    //   addStep()
    // }, 5)
    stepNum += stepDefault
    scrollDiv.scrollLeft += stepValue
    window.requestAnimationFrame(addStep)
  }
  addStep()
}

const openWindow = () => {
  var nowTag = contextMenuItem.value
  var url = nowTag.href || '/'
  if (!nowTag.meta.affix) {
    closeSelectedTag(nowTag)
  }
  window.open(url)
  contextMenuVisible.value = false
}

//关闭tag
const closeSelectedTag = (tag, autoPushLatestView = true) => {
  // if (tag.name == 'WorkBench') {
  //   return
  // }

  if (tag.meta.affix) {
    return
  }

  tabsStore.removeViewTags(tag)
  tabsStore.removeMenuKeeplive(tag.name)
  // tabsStore.setRouteShow(false)
  if (autoPushLatestView && isActive(tag)) {
    const latestView = tagList.value.slice(-1)[0]
    if (latestView) {
      nextTick(() => {
        router.push(latestView)
        // setTimeout(() => {
        //   tabsStore.setRouteShow(true)
        // }, 0)
      })
    } else {
      router.push('/')
    }
  }

  setStepScroll()
}
//关闭标签
const closeTabs = () => {
  var nowTag = contextMenuItem.value
  if (!nowTag.meta.affix) {
    closeSelectedTag(nowTag)
    contextMenuVisible.value = false
  }
}

//TAB 关闭其他
const closeOtherTabs = () => {
  var nowTag = contextMenuItem.value
  //判断是否当前路由，否的话跳转
  if (route.fullPath != nowTag.path) {
    router.push({
      path: nowTag.path,
      query: nowTag.query,
    })
  }
  var tags = [...tagList.value]
  tags.forEach((tag) => {
    if ((tag.meta && tag.meta.affix) || nowTag.path == tag.path) {
      return true
    } else {
      closeSelectedTag(tag, false)
    }
  })
  // setTimeout(() => {
  //   tabsStore.setRouteShow(true)
  // }, 0)
  contextMenuVisible.value = false
}

const closeAllTabs = () => {
  tagList.value = [] //tagList.value.filter((item) => item.name != 'WorkBench')
  var tags = [...tagList.value]
  tags.forEach((tag) => {
    closeSelectedTag(tag, false)
  })

  contextMenuVisible.value = false
  router.push('/') //WorkBench
  // setTimeout(() => {
  //   tabsStore.setRouteShow(true)
  // }, 0)
}

//TAB 最大化
const maximize = () => {
  var nowTag = contextMenuItem.value
  contextMenuVisible.value = false
  //判断是否当前路由，否的话跳转
  if (route.fullPath != nowTag.path) {
    router.push({
      path: nowTag.path,
      query: nowTag.query,
    })
  }

  exitMinimize()
}

//TAB 刷新
const refreshTab = () => {
  var nowTag = contextMenuItem.value
  contextMenuVisible.value = false
  //判断是否当前路由，否的话跳转
  if (route.fullPath != nowTag.path) {
    router.push({
      path: nowTag.path,
      query: nowTag.query,
    })
  }

  //刷新iframe模式
  // this.$store.commit('refreshIframe', nowTag)

  setTimeout(() => {
    tabsStore.removeMenuTabsKeeplive(nowTag.name)
    tabsStore.setRouteShow(false)
    nextTick(() => {
      tabsStore.pushMenuTabsKeeplive(nowTag.name)
      tabsStore.setRouteShow(true)
    })
  }, 0)
}

const tagDrop = () => {
  const target = tagsRef.value
  Sortable.create(target, {
    draggable: 'li',
    animation: 300,
  })
}
</script>

<style lang="scss" scoped>
// ─── 变量 ────────────────────────────────────────────────
$bg: #FFFFFF;
$text-main: #303133;
$text-muted: #606266;
$text-light: #909399;
$bg-tag: #F5F7FA;
$border: #E4E7ED;
$shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
$radius: 6px;
$transition: 150ms ease;

// ─── 整体标签栏 ──────────────────────────────────────────
.scrm-tags {
  display: flex;
  align-items: center;
  height: 36px;
  background: $bg;
  border-bottom: 1px solid $border;
  box-shadow: $shadow;
  user-select: none;

  // 滚动按钮
  .tagMove-left,
  .tagMove-right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: $radius;
    cursor: pointer;
    color: $text-light;
    background: transparent;
    transition: background $transition, color $transition;
    flex-shrink: 0;

    &:hover {
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }
  }

  // 标签列表
  ul {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0 4px;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  // 单个标签
  li {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 28px;
    margin: 0 3px;
    border-radius: $radius;
    background: $bg-tag;
    border: 1px solid transparent;
    cursor: pointer;
    transition: background $transition, border-color $transition, color $transition;

    a {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 12px;
      text-decoration: none;
      color: $text-muted;
      font-size: 13px;
      line-height: 1;
      white-space: nowrap;
    }

    &:hover {
      background: var(--el-color-primary-light-9);
      border-color: var(--el-color-primary-light-5);
      color: var(--el-color-primary);

      a {
        color: var(--el-color-primary);
      }
    }

    // 激活态 - 使用主题色
    &.active {
      background: var(--el-color-primary);
      border-color: var(--el-color-primary);
      color: #fff;

      a {
        color: #fff;
        font-weight: 600;
      }

      .el-icon {
        color: rgba(255, 255, 255, 0.8);

        &:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
        }
      }
    }

    // 固定标签（非激活态时轻度淡化）
    &.affix:not(.active) {
      opacity: 0.85;
    }

    // 固定标签处于激活态时，完全正常高亮
    &.affix.active {
      opacity: 1;
    }

    // 关闭图标
    :deep(.el-icon) {
      display: flex;
      align-items: center;
      color: #C0C4CC;
      font-size: 12px;
      transition: color $transition, background $transition;

      &:hover {
        color: #F56C6C;
        background: rgba(245, 108, 108, 0.1);
        border-radius: 50%;
      }
    }
  }
}

// ─── 右键菜单 ────────────────────────────────────────────
.contextmenu {
  position: fixed;
  width: 130px;
  margin: 0;
  background: $bg;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 3000;
  list-style-type: none;
  padding: 6px 0;
  overflow: hidden;

  hr {
    margin: 4px 0;
    border: none;
    height: 1px;
    background-color: #F0F0F0;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    cursor: pointer;
    line-height: 32px;
    padding: 0 14px;
    color: $text-main;
    font-size: 13px;
    transition: background $transition, color $transition;

    .el-icon {
      font-size: 14px;
      color: $text-light;
    }

    &:hover {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);

      .el-icon {
        color: var(--el-color-primary);
      }
    }

    &.disabled {
      cursor: not-allowed;
      color: #C0C4CC;
      background: transparent;

      .el-icon {
        color: #C0C4CC;
      }
    }
  }
}
</style>
