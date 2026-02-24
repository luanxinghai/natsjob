<template>
    <n-card :title="'客户端注册(' + nsName + ')'">
        <template #header-extra>
            <n-countdown ref="countdown" :duration="10000" :active="true" :on-finish="onFinish" />
            <SpaceGap />
            <i class="ri-loop-left-ai-line ri-lg" style="cursor: pointer;" @click="getData"></i>
        </template>

        <el-table highlight-current-row :data="data" border :height="500">
            <el-table-column prop="namespace" label="命名空间" min-width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="appName" label="服务" min-width="180"></el-table-column>
            <el-table-column prop="clientRegs" label="注册数" min-width="90">
                <template #default="{ row }">
                    {{ row.clientRegs ? row.clientRegs.length : 0 }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="60">
                <template #default="{ row }">
                    <GridRow :span="1">
                        <RegIconBtn @click="view(row)" />
                    </GridRow>
                </template>
            </el-table-column>
        </el-table>
    </n-card>
    <ClientRegView ref="viewRef" />
</template>

<script setup>
import { nsId, nsName } from "@/hooks/namespace"
const countdown = ref(null)

const searchFields = reactive({
    namespace: nsName
})
const data = ref([])
const getData = async () => {
    searchFields.namespace = nsName
    const res = await $post("natsjob/api/console/client-reg-ns", searchFields)
    data.value = res
}

const viewRef = ref()

onMounted(() => {
    getData();
});

const onFinish = () => {
    getData();
    countdown.value?.reset()
}

watch(nsId, () => {
    getData()
})

const view = (row) => {
    viewRef.value.view(nsName, row.appName)
}

</script>

<style lang="scss" scoped></style>