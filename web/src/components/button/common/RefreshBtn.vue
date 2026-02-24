<template>
    <el-button icon="RefreshRight" @click="data" v-bind="attrs">
        {{ name }}
    </el-button>
</template>

<script setup>
const attrs = useAttrs()
const props = defineProps({
    data: {
        type: Function,
        required: true,
        default: () => { },
    },
    name: {
        type: String,
        default: '刷新',
    },
})
</script>

<style lang="scss" scoped></style>
