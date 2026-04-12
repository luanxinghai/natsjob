<template>
    <el-select v-model="modelValue" v-bind="attrs" clearable style="min-width:200px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        ">
                {{ item.desc }}
            </span>
        </el-option>
    </el-select>
</template>

<script setup name="JobModel">
import { watch } from 'vue';
import { jobModelOptions } from './options';
const category = defineModel("category", {
    type: String,
    default: ""
})
const attrs = useAttrs()
const slots = useSlots()

const options = ref(jobModelOptions)
watch(category, (newVal, oldVal) => {
    if (newVal == "map") {
        options.value = jobModelOptions.filter((item) => item.value != "ultra")
    } else {
        options.value = jobModelOptions
    }
})
</script>

<style lang="scss" scoped></style>
