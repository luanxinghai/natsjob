<template>
  <div class="scrm-side-split">
    <div class="scrm-side-split-top center">
    </div>
    <div class="scrm-side-split-scroll">
      <el-scrollbar>
        <ul>
          <li v-for="item in menu" :key="item" :class="activeRouteParentPath == item.path ? 'active' : ''"
            @click="showMenu(item)">
            <el-icon v-if="item.meta && item.meta.ifont">
              <i :class="item.meta.ifont"></i>
            </el-icon>

            <p>{{ item.meta.title }}</p>
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>

import { useActiveRoutePath } from '@/route/routeWatch.js'
import { scrmConfigStore } from '@/stores/scrmConfig'
const { activeRoutePath, activeRouteParentPath } = useActiveRoutePath()
const scrmConf = scrmConfigStore()
const pros = defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
})

const router = useRouter()
const showMenu = (item) => {
  scrmConf.$patch(() => {
    scrmConf.menuSelectParName = item.name
  })
  router.push(item.path)
}
</script>

<style lang="scss" scoped></style>
