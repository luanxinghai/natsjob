<template>
  <el-button icon="Close">
    {{ name }}
  </el-button>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: '关闭',
  },
})
</script>

<style lang="scss" scoped></style>
