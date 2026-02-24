<template>
    <n-card title="服务端注册">
        <template #header-extra>
            <n-countdown ref="countdown" :duration="10000" :active="true" :on-finish="onFinish" />
            <SpaceGap />
            <i class="ri-loop-left-ai-line ri-lg" style="cursor: pointer;" @click="getData"></i>
        </template>

        <el-table highlight-current-row :data="data" border :height="500">
            <el-table-column prop="ip" label="ip" min-width="120" show-overflow-tooltip>
                <template #default="{ row }">
                    {{ row.systemInfo.machineIp }}
                </template>
            </el-table-column>
            <el-table-column prop="ipMaster" label="节点类型" min-width="100" show-overflow-tooltip>
                <template #default="{ row }">
                    <div class="d-success" v-if="row.isMaster">
                        <Dot type="success" />
                        主节点
                    </div>
                    <div class="d-danger" v-else>
                        <Dot type="danger" />
                        从节点
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="id" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cpu" label="cpu" min-width="120" show-overflow-tooltip>
                <template #default="{ row }">
                    {{ row.systemInfo.processCpuUsage }}
                </template>
            </el-table-column>
            <el-table-column prop="memeory" label="内存" min-width="120" show-overflow-tooltip>
                <template #default="{ row }">
                    {{ row.systemInfo.processMemoryRss }}
                </template>
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" min-width="180"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" min-width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="60">
                <template #default="{ row }">
                    <GridRow :span="1">
                        <ViewIconBtn @click="view(row)" />
                    </GridRow>
                </template>
            </el-table-column>
        </el-table>
    </n-card>
    <ServerRegView ref="viewRef" />
</template>

<script setup>
import { nsId, nsName } from "@/hooks/namespace"
const countdown = ref(null)
const viewRef = ref()
const searchFields = reactive({
    namespace: nsName
})
const data = ref([])
const getData = async () => {
    searchFields.namespace = nsName
    const res = await $post("natsjob/api/console/server-reg", searchFields)
    data.value = res
}

onMounted(() => {
    getData();
});

const onFinish = () => {
    getData();
    countdown.value?.reset()
}
const view = (row) => {
    console.log(row)
    console.log(row.systemInfo)
    viewRef.value.view(row.systemInfo)
}
</script>

<style lang="scss" scoped></style>