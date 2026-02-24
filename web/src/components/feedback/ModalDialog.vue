<template>
  <div class="d-container">
    <el-dialog center draggable :fullscreen="fullScreen" :show-close="false" top="12vh" v-bind="attrs">
      <template #header="{ close, titleId, titleClass }">
        <div class="d-header">
          <div class="center">
            <span :id="titleId" class="el-dialog__title">
              {{ title }}
            </span>
          </div>

          <div>
            <el-icon :size="32" @click="fullScreen = !fullScreen">
              <FullScreen style="font-size: 18px; cursor: pointer;" />
            </el-icon>
          </div>
          <div style="float: right;">
            <el-icon @click="close" :size="32">
              <Close style="font-size: 18px; cursor: pointer;" />
            </el-icon>
          </div>
        </div>
      </template>

      <div class="d-main" :style="mainStyle">
        <div>
          <el-scrollbar>
            <div class="d-form">
              <slot name="content"></slot>
            </div>

          </el-scrollbar>
        </div>
        <div>
          <slot name="info"></slot>
        </div>
        <div class="center">
          <slot name="footer"></slot>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { useAttrs, useSlots } from 'vue'
const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const fullScreen = ref(false)

const mainStyle = ref('max-height: 70vh;')
watch(fullScreen, (val) => {
  // console.log('--------------全屏')
  if (val) {
    mainStyle.value = 'height:calc(100vh - 100px) ;'
  } else {
    mainStyle.value = 'max-height: 70vh;'
  }
})

const setFullScreen = () => {
  fullScreen.value = true
}
defineExpose({
  setFullScreen,
})
</script>

<style lang="scss" scoped>
.d-header {
  padding: 5px 10px;
  display: grid;
  grid-template-columns: 1fr 30px 30px;
  justify-content: center;
  align-items: center;
  /* border-bottom: 1px solid var(--el-border-color); */
  /* & > div {
    border: 1px solid red;
  } */

}

.d-container {
  &:deep(.el-dialog__header) {
    padding: 2px 5px;
    margin-right: 0;
  }

  &:deep(.el-dialog__body) {
    /* padding: calc(var(--el-dialog-padding-primary) + 10px)
      var(--el-dialog-padding-primary); */
    /* padding: 10px var(--el-dialog-padding-primary); */
    padding: 2px 5px;
    color: var(--el-text-color-regular);
    font-size: var(--el-dialog-content-font-size);
    word-break: break-all;
  }
}

.d-main {
  display: grid;
  grid-template-rows: 1fr auto 40px;
  // border: 1px solid green;

  .d-form {
    margin: 10px 20px;
  }

  &>div {
    // overflow: auto;
    /* border: 1px solid green; */

  }

  & div:nth-child(1) {
    // max-height: calc(100vh - 300px);
    overflow: auto;
    // padding: 10px 5px;
    // background-color: #f5f5f50c;
    // background: #eeeeee86;
  }
}
</style>
