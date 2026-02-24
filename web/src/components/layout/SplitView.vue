<template>
    <div class="container">
        <div>
            <slot name="left"></slot>
        </div>
        <div>
            <slot name="right"></slot>
        </div>
    </div>
</template>
  
<script setup>
const attrs = useAttrs()
let leftWith = attrs?.leftWith ?? "280px"
//const style = ref(`grid-template-columns: ${leftWith}  1fr;`)
</script>
  
<style lang="scss" scoped>
.container {
    width: 100%;
    display: grid;
    // grid-template-columns: 280px 1fr;
    grid-template-columns: v-bind(leftWith) 1fr;

    gap: 5px;
    /* padding: 0 3px; */
    background: var(--scrm-bg-color);
    //padding: 5px;

    &>div {
        // overflow: auto;
        background: #fff;
        height: var(--main-tab-height);
    }
}
</style>
  