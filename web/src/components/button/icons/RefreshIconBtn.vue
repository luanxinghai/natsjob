<template>
    <el-button icon="RefreshRight" @click="data" v-bind="attrs" circle>
    </el-button>
</template>

<script setup>
const attrs = useAttrs()
const props = defineProps({
    data: {
        type: Function,
        required: true,
        default: () => { },
    }
})
</script>

<style lang="scss" scoped></style>
