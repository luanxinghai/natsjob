<template>
  <div class="container">
    <div>
      <slot name="header" />
    </div>
    <div>
      <slot name="table" />
    </div>
    <div>
      <slot name="page" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
