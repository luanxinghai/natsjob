<template>
  <el-config-provider :locale="zhCn" :z-index="3000">
    <n-config-provider :theme-overrides="themeOverrides">
      <router-view></router-view>
    </n-config-provider>
  </el-config-provider>
</template>
<script setup name="App">
import { NConfigProvider } from 'naive-ui'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { themeOverrides } from '@/utils/theme'

</script>

<style lang="scss">
@use "@/style/style.scss";
</style>
