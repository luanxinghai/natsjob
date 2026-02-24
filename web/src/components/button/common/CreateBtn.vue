<template>
  <el-button type="primary" icon="Plus">
    {{ name }}
  </el-button>
</template>

<script setup>
const name = defineModel("name", {
  type: String,
  default: '新增',
})
</script>

<style lang="scss" scoped></style>
