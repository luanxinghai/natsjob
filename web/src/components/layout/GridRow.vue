<template>
  <div class="container" :style="style">
    <slot></slot>
  </div>
</template>

<script setup>
const attrs = useAttrs()
let span = attrs?.span ?? 2
let gap = attrs?.gap ?? "0"
const style = ref('');
const gapValue = ref(gap + "px");
if (!isNaN(span)) {
  style.value = `grid-template-columns: repeat(${span}, 1fr);`
} else {
  style.value = `grid-template-columns: ${span};`
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  gap: v-bind(gapValue);
  /* margin: 10px 0; */

  &>div {
    display: flex;
    justify-content: center;
    align-items: center;
    //border: 1px solid red;
  }
}
</style>
