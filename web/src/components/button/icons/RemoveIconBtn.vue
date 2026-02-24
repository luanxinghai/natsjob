<template>
  <!-- <div class="center"> -->
  <el-popconfirm confirmButtonText="确定" cancelButtonText="取消" iconColor="red" title="确定删除吗？" v-bind="attrs">
    <template #reference>
      <!-- <span class="center"> -->
      <IconRemixTemp name="ri-delete-bin-7-line" style="
              color: var(--scrm-color-danger);
              cursor: pointer;
            " />
      <!-- </span> -->
    </template>
  </el-popconfirm>
  <!-- </div> -->
</template>

<script setup>
const attrs = useAttrs()
const slots = useSlots()
</script>

<style lang="scss" scoped></style>
