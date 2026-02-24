<template>

  <el-popconfirm confirmButtonText="确定" cancelButtonText="取消" iconColor="red" title="确定删除吗？">
    <template #reference>
      <el-button v-bind="attrs">
        {{ name }}
      </el-button>
    </template>
  </el-popconfirm>
</template>

<script setup>
const attrs = useAttrs()
const slots = useSlots()
const name = defineModel("name", { default: "删除" })
</script>

<style lang="scss" scoped></style>
