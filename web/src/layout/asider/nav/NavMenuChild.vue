<template>
  <div :class="menuIsCollapse ? 'scrm-side isCollapse' : 'scrm-side'">
    <div class="scrm-side-split-top center">
      <el-avatar :size="30" src="./header/lxh2.png" />
      <span style="width: 130px; padding-left: 5px;font-size: larger;" v-show="!menuIsCollapse">
        NatsJob
      </span>
    </div>
    <div class="scrm-side-scroll">
      <el-scrollbar>
        <el-menu :default-active="activeRoutePath" router :collapse="menuIsCollapse" :unique-opened="MENU_UNIQUE_OPENED"
          active-text-color="var(--el-color-primary)">
          <NavMenu :navMenus="menu"></NavMenu>
        </el-menu>
      </el-scrollbar>
    </div>

    <div class="scrm-side-bottom" @click="menuIsCollapse = !menuIsCollapse">
      <span class="b-coll">
        <el-icon>
          <Expand v-if="menuIsCollapse" />
          <Fold v-else />
        </el-icon>
      </span>
    </div>
  </div>
</template>

<script setup>
import { useActiveRoutePath } from '@/router/routeWatch.js'
import { ref } from 'vue'
const { activeRoutePath } = useActiveRoutePath()
const pros = defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
})
const menuIsCollapse = ref(false)
const MENU_UNIQUE_OPENED = ref(true)
</script>

<style lang="scss" scoped></style>
