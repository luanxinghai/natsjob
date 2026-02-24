<template>
  <el-button>
    <i class="ri-arrow-drop-left-line"></i> {{ name }}
  </el-button>
</template>

<script setup>
const name = defineModel("name", { default: "返回" })
</script>

<style lang="scss" scoped></style>
