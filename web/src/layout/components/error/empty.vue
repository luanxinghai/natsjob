<template>
  <!-- <router-view></router-view> -->
  <!-- <router-view v-slot="{ Component }">
    <keep-alive :include="keepLiveRoute">
      <component :is="Component" />
    </keep-alive>
  </router-view> -->
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { tabsStore } from '@/stores/useTabsStore'

const tabMenuIconBtn = tabsStore()
const route = useRoute()
const router = useRouter()
const keepLiveRoute = computed(() => tabMenuIconBtn.menuTabsKeeplive)
const menuTabs = computed(() => tabMenuIconBtn.menuTabs)

watch(route, (to, oldValue) => {
  // if (to.path.includes("HomeNew")) {
  //   return false
  // }
  //console.log('333333333333333', to.path, to.name, to.meta, oldValue.meta)
  let mTab = menuTabs.value.filter((item) => item.name == to.name)
  console.log('llll', mTab)
  //if (keepLiveRoute.value.indexOf(to.name) === -1) {
  if (mTab == undefined || mTab.length == 0) {
    tabMenuIconBtn.addMenuTabs({
      path: to.path,
      name: to.name,
      meta: to.meta,
    })
    //keepLiveRoute.value.push(to.name)
    // console.log('增加路由菜单', to.path, to.name, to.meta, oldValue.meta)
  }
  tabMenuIconBtn.setActiveTabs(to.name)
})
</script>

<style lang="scss" scoped></style>
