<template>
  <el-time-picker v-model="stime" :format="fromat" @change="setStime" style="width: 200px;" :clearable="false" />
</template>

<script setup>
import dayjs from 'dayjs'
const fromat = defineProps("fromat", {
  type: String,
  default: 'HH:mm:ss',
})

const stime = defineModel({
  set(value) {
    console.log("set0000000000000000000", value, value instanceof Date)
    // let sArr = value.split(':')
    // if (sArr.length >= 2) {
    //   value = new Date(
    //     myDay.year(),
    //     myDay.month(),
    //     myDay.date(),
    //     sArr[0],
    //     sArr[1],
    //   )
    // }
    return value
  },
  get(value) {

    console.log("get000000000000000000", value, value instanceof Date)
    // if (value) {
    //   dayjs(value).format(fromat)
    // }
    return value
  },
})
const setStime = () => {
  //emit('update:stime', dayjs(time1.value[0]).format(props.fromat))
}
</script>

<style lang="scss" scoped></style>
