<template>
  <el-popover placement="bottom" :width="200" trigger="click">
    <template #reference>
      <el-button circle icon="Tickets" />
    </template>
    <div style="max-height: 400px; overflow: auto;">
      <el-checkbox
        v-model="checkedAllField"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
      >
        全部
      </el-checkbox>
      <!--  -->
      <el-checkbox-group v-model="checkedField" @change="handleCheckedChange">
        <el-checkbox v-for="f in field" :key="f.field" :label="f.field">
          {{ f.name }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </el-popover>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
  field: {
    type: Array,
    default: [],
  },
})

const emit = defineEmits(['update:modelValue'])
// emit('update:modelValue', checkedField.value)

const checkedField = ref([])
const checkedAllField = ref(true)
const isIndeterminate = ref(false)

const handleCheckAllChange = (val) => {
  val ? setFieldCheck() : (checkedField.value = [])
  isIndeterminate.value = false
  emit('update:modelValue', checkedField.value)
}
const handleCheckedChange = (value) => {
  const checkedCount = value.length
  // console.log('22222', checkedCount, field.value.length)
  checkedAllField.value = checkedCount === props.field.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < props.field.length
  // console.log('222', 42424243)

  emit('update:modelValue', checkedField.value)
}

const setFieldCheck = () => {
  checkedField.value = []
  props.field.map((item) => {
    checkedField.value.push(item.field)
  })
  emit('update:modelValue', checkedField.value)
}

onMounted(() => {
  setFieldCheck()
})

watch(
  () => props.field,
  () => {
    setFieldCheck()
  },
)
</script>

<style lang="scss" scoped></style>
