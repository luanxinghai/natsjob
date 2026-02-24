<template>
    <el-button plain>
        <i class="ri-refresh-line"></i> &nbsp;&nbsp;{{ name }}
    </el-button>
</template>

<script setup>
const name = defineModel("name", {
    type: String,
    default: '重置',
})
</script>

<style lang="scss" scoped></style>