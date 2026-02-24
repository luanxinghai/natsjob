<template>
  <el-time-picker v-model="time1" :format="format" :value-format="valueFormat" @change="setStime" clearable />
</template>

<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  stime: {
    type: String,
    default: '',
  },
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  valueFormat: {
    type: String,
    default: "HH:mm:ss",
  },
})

const emit = defineEmits(['update:stime'])

let myDay = dayjs()
const time1 = ref()
onMounted(() => {
  let stime = props.stime ?? ''
  let sArr = stime.split(':')
  if (sArr.length >= 2) {
    time1.value = new Date(
      myDay.year(),
      myDay.month(),
      myDay.date(),
      sArr[0],
      sArr[1],
    )
  }
  setStime()
})
const setStime = () => {
  if (!time1.value) return
  emit('update:stime', dayjs(time1.value).format(props.format ?? 'HH:mm:ss'))
}
</script>

<style lang="scss" scoped></style>
