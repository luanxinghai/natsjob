<template>
  <el-button type="primary" icon="Search">
    {{ name }}
  </el-button>
</template>

<script setup>

const name = defineModel("name", { default: "搜索" })

</script>

<style lang="scss" scoped></style>
