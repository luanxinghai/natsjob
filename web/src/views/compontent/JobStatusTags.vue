<template>
    <el-tag type="primary" effect="plain" v-if="modelValue == 0">
        启用
    </el-tag>
    <el-tag type="danger" effect="plain" v-else>
        停用
    </el-tag>
</template>

<script setup name="JobStatusTags">
const modelValue = defineModel({
    required: true,
    default: () => ""
})
</script>

<style lang="scss" scoped></style>
