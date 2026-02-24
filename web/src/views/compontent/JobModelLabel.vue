<template>
    {{ label }}
</template>

<script setup name="JobModelLabel">
import { jobModelOptions } from './options';
const modelValue = defineModel({
    required: true,
    default: () => ""
})

const label = ref("")
const options = ref(jobModelOptions)
onBeforeMount(() => {
    setValue()
})
const setValue = () => {
    let val = modelValue.value
    options.value.forEach(item => {
        if (item.value == val) {
            label.value = item.label
        }
    })
}
watch(modelValue, () => setValue())
</script>

<style lang="scss" scoped></style>
