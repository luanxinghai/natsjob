<template>
  <div v-show="$route.meta.type == 'iframe'" class="iframe-pages">
    <iframe v-for="item in iframeList" :key="item.meta.url" v-show="$route.meta.url == item.meta.url"
      :src="item.meta.url" frameborder="0"></iframe>
  </div>
</template>


<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useTabsStore } from '@/stores/useTabsStore'

const tabMenuIconBtn = useTabsStore()
const route = useRoute()
const router = useRouter()

const iframeList = computed(() => tabMenuIconBtn.iframeTabs)

watch(route, (to, oldValue) => {
  if (to.meta.type != 'iframe') {
    return
  }

  let iTab = iframeList.value.filter((item) => item.name == to.name)
  // console.log(iTab, '88888888')
  if (iTab == undefined || iTab.length == 0) {
    tabMenuIconBtn.addMenuTabs({
      path: to.path,
      name: to.name,
      meta: to.meta,
    })
  }
  tabMenuIconBtn.setActiveTabs(to.name)
})
</script>

<style scoped>
.iframe-pages {
  width: 100%;
  height: 100%;
  background: #fff;
}

iframe {
  border: 0;
  width: 100%;
  height: 100%;
  display: block;
}
</style>
