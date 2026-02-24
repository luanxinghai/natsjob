<template>
    <el-select v-model="modelValue" v-bind="attrs" clearable style="min-width:200px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</template>

<script setup name="JobCategory">
import { jobCategoryOptions } from './options';
const attrs = useAttrs()
const slots = useSlots()

const options = ref(jobCategoryOptions)


</script>

<style lang="scss" scoped></style>
