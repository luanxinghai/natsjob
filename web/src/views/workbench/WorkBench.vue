<template>
  <div class="w-main">
    <div class="w-container">
      <ServerRegCurrent />
      <CacheStat />
    </div>

    <div class="w-container wtop">
      <ServerReg />
      <ClientReg />
    </div>
  </div>
</template>

<script setup name="WorkBench">
const value = ref("");
</script>

<style lang="scss" scoped>
.w-main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .w-container {
    display: grid;
    grid-template-columns: repeat(2, minmax(0px, 1fr));
    gap: 10px;
    flex-shrink: 0;
  }

  .wtop {
    margin-top: 0;
  }

  // 子组件自带 n-card，统一圆角与浅边框，贴近参考项目卡片风格
  :deep(.n-card) {
    border-radius: 10px;
    border: 1px solid #ebeef5;
    background: #fff;
  }
}
</style>
