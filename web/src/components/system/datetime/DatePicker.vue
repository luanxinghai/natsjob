<template>
  <el-date-picker v-model="dateValue" type="date" :format="format" :value-format="valueFormat" @change="setStime"
    clearable />
</template>

<script setup>
import dayjs from 'dayjs'
import { onBeforeMount } from 'vue';

const props = defineProps({
  sdate: {
    type: String,
    default: '',
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  valueFormat: {
    type: String,
    default: "YYYY-MM-DD",
  },
})

const emit = defineEmits(['update:sdate'])
const dateValue = ref()
onBeforeMount(() => {
  let sdate = props.sdate ?? ''
  if (sdate != '') {
    dateValue.value = dayjs(`${sdate}`)
  }
})

const setStime = () => {
  if (!dateValue.value) return
  emit('update:sdate', dayjs(dateValue.value).format(props.valueFormat))
}
</script>

<style lang="scss" scoped></style>
