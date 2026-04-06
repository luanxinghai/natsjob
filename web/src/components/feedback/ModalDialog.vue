<template>
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
      <div :style="formStyle">
        <slot name="content"></slot>
      </div>
      <div>
        <slot name="info"></slot>
      </div>
      <div class="center">
        <slot name="footer"></slot>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const fullScreen = ref(false)

const mainStyle = ref('max-height: 70vh;height: 70vh;')
const formStyle = ref('height: 70vh;')
watch(fullScreen, (val) => {
  // console.log('--------------全屏')
  if (val) {
    mainStyle.value = 'height:calc(100vh - 100px) ;'
    formStyle.value = 'height:calc(100vh - 120px) ;'
  } else {
    mainStyle.value = 'height: 70vh;'
    formStyle.value = 'height: 70vh;'
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
}



.d-main {
  display: grid;
  grid-template-rows: 1fr auto 40px;

  & div:nth-child(1) {
    overflow: auto;
  }
}
</style>
