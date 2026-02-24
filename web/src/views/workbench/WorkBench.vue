<template>
  <div class="workbench-main">
    <div class="workbench-container">
      <ServerRegCurrent />
      <CacheStat />
    </div>

    <div class="workbench-container">
      <ServerReg />
      <ClientReg />
    </div>
  </div>
</template>

<script setup name="WorkBench">
const value = ref("");
</script>

<style lang="scss" scoped>
.workbench-main {
  height: 100%;
  width: 100%;
  padding: 4px;

  .workbench-container {
    margin-top: 6px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0px, 1fr));
    gap: 6px;
  }

}
</style>
