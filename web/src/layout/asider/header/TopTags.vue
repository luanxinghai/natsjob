<template>
  <!-- <div style="display: flex; flex: 1; width: 100%;"> -->
  <div class="scrm-tags" ref="elTag">
    <div class="center tagMove-left" :style="setpScroll.left" @click="scrollInitAdd(true)">
      <!-- 1 {{ width }}-{{ height }} -->
      <!-- <i class="ri-rewind-mini-line"></i> -->
      <i class="ri-arrow-left-s-line"></i>
    </div>
    <div style="width: calc(100% - 60px);">
      <!-- {{ tagList }} -->
      <ul ref="tagsRef">
        <li v-for="tag in tagList" v-bind:key="tag" :class="[
          isActive(tag) ? 'active' : '',
          tag.meta.affix ? 'affix' : '',
        ]" @contextmenu.prevent="openContextMenu($event, tag)">
          <!-- <a>
            <span>{{ tag.meta.title }}</span>
            <el-icon v-if="tag.meta.closeTag" @click.prevent.stop="closeSelectedTag(tag)">
              <Close />
            </el-icon>
            <Close />
          </a> -->
          <router-link :to="tag">
            <!-- {{ tag.query }} -->
            <span>{{ tag.meta.title }}</span>
            <el-icon v-if="tag.meta.closeTag" @click.prevent.stop="closeSelectedTag(tag)">
              <Close />
            </el-icon>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="center tagMove-right" :style="setpScroll.right" @click="scrollInitAdd(false)">
      <!-- <i class="ri-arrow-right-s-line ri-xl"></i> -->
      <i class="ri-arrow-right-s-line"></i>
    </div>
  </div>
  <!-- </div> -->
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
import { nsId, nsName } from "@/hooks/namespace"
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

watch(nsId, () => {
  closeAllTabs()
})

</script>

<style>
.menu-item {
  cursor: pointer;
  padding: 0px 10px;
}

.contextmenu {
  position: fixed;
  width: 125px;
  margin: 0;
  border-radius: 0px;
  background: #fff;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 3000;
  list-style-type: none;
  padding: 10px 0;
}

.contextmenu hr {
  margin: 5px 0;
  border: none;
  height: 1px;
  font-size: 0px;
  background-color: #ebeef5;
}

.contextmenu li {
  display: flex;
  align-items: center;
  margin: 0;
  cursor: pointer;
  line-height: 30px;
  padding: 0 17px;
  color: #606266;
}

.contextmenu li i {
  font-size: 14px;
  margin-right: 10px;
}

.contextmenu li:hover {
  background-color: #ecf5ff;
  color: var(--el-color-primary);
  /* #66b1ff; */
}

.contextmenu li.disabled {
  cursor: not-allowed;
  color: #bbb;
  background: transparent;
}

.tags-tip {
  padding: 5px;
}

.tags-tip p {
  margin-bottom: 10px;
}

.tagMove-left {
  /* border-right: 1px solid #e5e6eb9c; */
  cursor: pointer;
  width: 30px;
  /* margin: 3px 0; */
  background: #fff;
}

.tagMove-right {
  /* border-left: 1px solid #e5e6eb9c; */
  cursor: pointer;
  width: 30px;
  /* margin: 3px 0; */
  background: #fff;
}
</style>
