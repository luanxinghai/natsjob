<template>
  <div class="main-maximize-exit" @click="exitMaximize">
    <el-icon>
      <Close />
    </el-icon>
  </div>
  <section class="scrm-wrapper">
    <NavMenuChild :menu="menu" />
    <div class="scrm-tabs">
      <TopHeader />
      <div class="scrm-wrapper1">
        <div class="scrm-body">
          <TopTags></TopTags>
          <div class="scrm-main" id="scrm-main">
            <router-view v-slot="{ Component }">
              <keep-alive :include="keepLiveRoute">
                <component :is="Component" :key="$route.fullPath" v-if="routeShow" />
              </keep-alive>
            </router-view>
            <iframeView></iframeView>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useTabsStore } from '@/stores/useTabsStore'
import { loadMenu } from '@/hooks/menu.js'
import { exitMaximize } from '@/utils/theme.js'
import { refreshLogin } from "@/app/app"

const tabStore = useTabsStore()
const router = useRouter()
const active = ref('')
const route = useRoute()

const keepLiveRoute = computed(() => tabStore.menuTabsKeeplive)
const routeShow = computed(() => tabStore.routeShow)

watch(route, (to, oldValue) => {
  if (to.meta.keepAlive) {
    tabStore.pushMenuTabsKeeplive(to.name)
  }

  console.log('route cache', tabStore.menuTabsKeeplive)
})

const menu = ref([])
onMounted(async () => {
  let myMenu = await loadMenu()
  console.log('origin route menu', myMenu)
  menu.value = myMenu
})
onBeforeMount(() => {
  refreshLogin()
})

</script>

<style lang="scss" scoped>
.scrm-tabs {
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
}
</style>
