<template>
    <template v-for="i in count">
        &nbsp;
    </template>
</template>

<script setup>

const count = defineModel("count", {
    default: 2,
    type: Number
})

</script>

<style lang="scss" scoped></style>