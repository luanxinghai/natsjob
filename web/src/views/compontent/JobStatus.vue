<template>
    <el-radio-group v-model="modelValue" v-bind="attrs" clearable>
        <el-radio-button v-for="item in options" :key="item.value" :value="item.value">
            {{ item.label }}
        </el-radio-button>
    </el-radio-group>
</template>

<script setup name="JobStatus">
import { jobStatusOptions } from './options';
const attrs = useAttrs()
const slots = useSlots()

const options = ref(jobStatusOptions)
</script>

<style lang="scss" scoped></style>
