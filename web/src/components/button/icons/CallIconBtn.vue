<template>
  <div class="tel">
    <div class="center">
      {{ tel }}
    </div>
    <IconRemixTemp name="ri-phone-line" v-if="tel && tel != ''" @click="placeTel" style="float: right !important;" />
  </div>
</template>

<script setup>
import { placecallProxy } from '@/app/client/wsClient.js'
const tel = defineModel("tel")
const telFpe = defineModel("fpe")
const placeTel = () => {
  let telValue = (telFpe.value && telFpe.value != '') ? (tel.value + "|" + telFpe.value) : tel.value
  placecallProxy(telValue)
}

</script>

<style lang="scss" scoped>
.tel {
  display: grid;
  grid-template-columns: 1fr 30px;

}
</style>
