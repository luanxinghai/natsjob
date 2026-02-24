<template>
  <el-button type="primary">
    {{ name }}
  </el-button>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped></style>
