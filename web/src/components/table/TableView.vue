<template>
  <div class="table-box r-main">
    <div class="table-search" :class="collapse ? 'r-search' : 'r-search-collapse'" v-if="$slots.search">
      <n-collapse :default-expanded-names="['1']" style="position: relative;top:-10px" v-if="collapse"
        @item-header-click="handleItemHeaderClick">
        <template #arrow>
          <i class="ri-arrow-down-double-fill"></i>
        </template>
        <n-collapse-item title="" name="1">
          <template #header>
            <span class="search-area__label">{{ itemExpanded ? '折叠' : '展开' }}检索</span>
          </template>
          <slot name="search" />
        </n-collapse-item>
      </n-collapse>
      <span v-else>
        <slot name="search" />
      </span>

    </div>
    <div class="table-header r-header" v-if="$slots.header">
      <div>
        <slot name="header"></slot>
      </div>
      <div>
        <slot name="header-right" />
      </div>
    </div>
    <el-table highlight-current-row border :height="600" v-bind="attrs" v-if="$slots.column">
      <slot name="column"></slot>
    </el-table>
    <div v-if="slots.card" class="card-container">
      <slot name="card"></slot>
    </div>


    <div class="center" style="background-color: #fff; padding-left: 10px;" v-show="pagination">
      <!-- small -->
      <el-pagination background @current-change="handleCurrentChange" :currentPage="page.current" :page-size="page.size"
        layout="total, prev, pager, next,sizes,jumper" :total="page.total" :page-sizes="page.pageSizes"
        @size-change="handleSizeChange"></el-pagination>
    </div>
  </div>
</template>

<script setup>
const attrs = useAttrs()
const slots = useSlots()
const itemExpanded = ref(true)

const props = defineProps({
  search: {
    type: Function,
    default: () => { },
  },
  page: {
    type: Object,
    default: {
      current: 1,
      size: 10,
      total: 0,
      pageSizes: [10, 50, 100, 200, 300, 500],
    },
  },
  pagination: {
    type: Boolean,
    default: true,
  },
  collapse: {
    type: Boolean,
    default: true
  }
})

const handleCurrentChange = (val) => {
  props.page.current = val
  props.search()
}

const handleSizeChange = (val) => {
  props.page.size = val
  props.search()
}

const handleItemHeaderClick = ({ name, expanded }) => {
  itemExpanded.value = expanded
}
</script>

<style lang="scss" scoped>
.r-main {
  /* border: 1px solid #fff; */
  overflow: auto;
  // height: var(--main-height);
  height: 100%;
}

.r-search-collapse {
  padding: 12px 10px 10px 10px;
  background-color: #fff;
  border-bottom: 1px solid var(--scrm-bg-color);
}

.r-search {
  padding: 12px 10px 0px 10px;
  background-color: #fff;
  border-bottom: 1px solid var(--scrm-bg-color);
}

.r-header {
  /* margin-top: 1px; */
  padding: 5px 10px;
  background-color: #fff;
  display: grid;
  grid-template-columns: 1fr auto;

}

.card-container {
  height: 100%;
  width: 100%;
  // padding: 2px 0;
  overflow: auto;
}

.collapse {
  cursor: pointer;
}

.search-area__label {
  font-size: 12px;
  color: #999;
}
</style>
