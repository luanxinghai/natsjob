<template>
    <!-- <div class="center"> -->
    <el-button circle size="small">
        <i :class="name" :style="style"></i>
    </el-button>
    <!-- </div> -->
</template>

<script setup>
const name = defineModel("name", { required: true })
const style = defineModel("style")
</script>

<style lang="scss" scoped></style>