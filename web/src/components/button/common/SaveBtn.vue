<template>
  <el-button type="primary" icon="Check">
    {{ name }}
  </el-button>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: '保存',
  },
})
</script>

<style lang="scss" scoped></style>
