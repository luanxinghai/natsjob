<template>
  <SvgIcon v-bind="attrs" style="width: 22px; height: 22px; cursor: pointer;" />
</template>

<script setup>
const attrs = useAttrs()
const slots = useSlots()
</script>

<style lang="scss" scoped></style>
