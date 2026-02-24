<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view></router-view>
  </n-config-provider>
</template>
<script setup name="App">
import { NConfigProvider } from 'naive-ui'
import { themeOverrides } from '@/utils/theme'
</script>

<style lang="scss">
@use "@/style/style.scss";
</style>
