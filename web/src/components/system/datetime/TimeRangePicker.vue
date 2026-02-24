<template>
  <el-time-picker v-model="time1" is-range range-separator="至" start-placeholder="" end-placeholder="" :format="format"
    @change="setStime" style="width: 200px;" :clearable="false" />
</template>

<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  stime: {
    type: String,
    default: '',
  },
  etime: {
    type: String,
    default: '',
  },
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
})

const emit = defineEmits(['update:stime', 'update:etime'])

let myDay = dayjs()
const time1 = ref([
  new Date(myDay.year(), myDay.month(), myDay.date(), 0, 0, 0),
  new Date(myDay.year(), myDay.month(), myDay.date(), 23, 59, 59),
])
onMounted(() => {
  // console.log('aaaa', props.stime, props.etime)

  let stime = props.stime ?? ''
  let sArr = stime.split(':')
  if (sArr.length >= 2) {
    time1.value[0] = new Date(
      myDay.year(),
      myDay.month(),
      myDay.date(),
      sArr[0],
      sArr[1],
    )
  }

  let etime = props.etime ?? ''
  let eArr = etime.split(':')
  if (eArr.length >= 2) {
    time1.value[1] = new Date(
      myDay.year(),
      myDay.month(),
      myDay.date(),
      eArr[0],
      eArr[1],
    )
  }
  setStime()
})
const setStime = () => {
  // console.log(time1.value)
  // console.log(dayjs(time1.value[0]).format(props.format))
  // console.log(dayjs(time1.value[1]).format(props.format))
  emit('update:stime', dayjs(time1.value[0]).format(props.format))
  emit('update:etime', dayjs(time1.value[1]).format(props.format))
}
</script>

<style lang="scss" scoped></style>
