<template>
  <el-date-picker v-model="dateValue" type="daterange" range-separator="至" start-placeholder="" end-placeholder=""
    format="YYYY-MM-DD" @change="setStime" />
</template>

<script setup>
import dayjs from 'dayjs'
// const props = defineProps({
//   sdate: {
//     type: String,
//     default: '',
//   },
//   edate: {
//     type: String,
//     default: '',
//   },
// })

const sdateValue = defineModel('sdate', { default: '', type: String })
const edateValue = defineModel('edate', { default: '', type: String })

watch([sdateValue, edateValue], () => {
  setDateValue()
})

const emit = defineEmits(['update:sdate', 'update:edate'])
// let myDay = dayjs()
// const dateValue = ref([
//   new Date(myDay.year(), myDay.month(), myDay.date(), 0, 0),
//   new Date(myDay.year(), myDay.month(), myDay.date(), 0, 0),
// ])
const dateValue = ref([
  null,
  null,
])
onMounted(() => {
  setDateValue()
})

const setDateValue = () => {
  let sdate = sdateValue.value ?? ''
  if (sdate != '') {
    dateValue.value[0] = dayjs(`${sdate} 00:00:00`)
  } else {
    dateValue.value[0] = null
  }

  let edate = edateValue.value ?? ''
  if (edate != '') {
    dateValue.value[1] = dayjs(`${edate} 00:00:00`)
  } else {
    dateValue.value[1] = null
  }
  setStime()
}

const setStime = () => {
  if (dateValue.value == null || dateValue.value[0] == null || dateValue.value[1] == null) {
    dateValue.value = [null, null]
    emit('update:sdate', '')
    emit('update:edate', '')
    return
  }
  emit('update:sdate', dayjs(dateValue.value[0]).format('YYYY-MM-DD'))
  emit('update:edate', dayjs(dateValue.value[1]).format('YYYY-MM-DD'))
}
</script>

<style lang="scss" scoped></style>
