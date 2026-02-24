<template>
  <el-pagination
    @current-change="handleCurrentChange"
    :currentPage="page.current"
    :page-size="page.size"
    layout="total, prev, pager, next,sizes,jumper"
    :total="page.total"
    :page-sizes="[10, 50, 100, 200]"
    @size-change="handleSizeChange"
  ></el-pagination>
</template>

<script setup>
import { useAttrs, useSlots } from 'vue'
const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  getData: {
    type: Function,
    default: () => {},
  },
  page: {
    type: Object,
    default: { current: 1, size: 10, total: 0 },
  },
})

const handleCurrentChange = (val) => {
  //emit('current-change', props.page.current)
  props.page.current = val
  //console.log(props.page.current)
  props.getData()
}

const handleSizeChange = (val) => {
  //props.page.total = 100
  props.page.size = val
  //emit('size-change', val)
  props.getData()
}
</script>

<style lang="scss" scoped></style>
