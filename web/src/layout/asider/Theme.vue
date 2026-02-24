<template>
  <div class="theme">
    <el-color-picker size="small" v-model="colors.primary" :predefine="colors.colorList"
      @change="setColor"></el-color-picker>
  </div>
</template>

<script setup>
import { setTheme } from '@/utils/theme'
const colors = reactive({
  primary: '#009688',
  colorList: [
    '#1C334A',
    '#000000',
    '#316C72',
    '#006ad4',
    '#409EFF',
    '#009688',
    '#536dfe',
    '#ff5c93',
    '#c62f2f',
    '#fd726d',
    '#ff4500',
    '#ff8c00',
    '#757575',
    '#52C41A',
    '#c71585',
    '#5F80C7',
    '#964E0F',
    '#32A2D4',
    '#33CC99',
    '#9266F9',
  ],
})
onMounted(() => {
  const app_color = localStorage.getItem('scrm-themeColor') ?? colors.primary
  colors.primary = app_color
  setTheme(app_color)
})


const setColor = (color) => {
  setTheme(color)
}


</script>

<style lang="scss" scoped>
.theme:deep(.el-color-picker__trigger) {
  /* display: none !important; */
  height: 26px !important;
  width: 26px !important;
  padding: 2px !important;
  /* color: #757575; */
}
</style>
