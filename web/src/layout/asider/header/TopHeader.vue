<template>
  <header class="scrm-header">
    <div class="scrm-header-left">
      <div class="header-left">
        <div>命名空间</div>
        <SpaceGap />
        <el-dropdown type="primary" v-if="options.length > 10">
          <el-button text bg style="min-width: 100px;"> {{ ns }} <el-icon
              class="el-icon--right"><arrow-down /></el-icon></el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in options" :key="item.id" :value="item.id" @click="nsClick(item)">
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-segmented v-model="ns" :options="optionsSegmented" @change="nsClickPlus" v-else />
      </div>
    </div>
    <div class="scrm-header-right">
      <TopMenu></TopMenu>
    </div>
  </header>
</template>

<script setup>
import { nsId, nsName, nsUpdate } from "@/hooks/namespace"
import { computed, watch } from "vue"
const ns = ref("app")
const options = ref([])
const getNs = async () => {
  const res = await $post("natsjob/api/namespace/list-all")
  options.value = res || []
}

const optionsSegmented = computed(() => {
  return options.value.map(item => item.name)
}
)

onMounted(() => {
  getNs()
})

const nsClick = (item) => {
  ns.value = item.name
  nsId.value = item.id + ""
  nsName.value = item.name
}
const nsClickPlus = (name) => {
  const item = options.value.find(item => item.name === name)
  nsClick(item)
}

watch(nsUpdate, () => {
  getNs()
  ns.value = "app"
})

</script>

<style lang="scss" scoped>
.header-left {
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-items: center;

}
</style>
