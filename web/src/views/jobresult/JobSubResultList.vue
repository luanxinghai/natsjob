<template>
    <ModalDialog title="子任务数据详情" v-model="dialogFormVisible" width="80%" destroy-on-close draggable center>
        <template #content>
            <div class="content">
                <TableView :data="table.data" :page="page" :search="useTableSearch">
                    <template #column>
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop="id" label="编号" min-width="180"></el-table-column>
                        <el-table-column prop="clientId" label="客户端ID" min-width="160"
                            show-overflow-tooltip></el-table-column>
                        <el-table-column prop="sceneId" label="场景ID" min-width="160"
                            show-overflow-tooltip></el-table-column>
                        <el-table-column prop="sceneName" label="场景名称" min-width="160"
                            show-overflow-tooltip></el-table-column>
                        <el-table-column prop="status" label="状态" min-width="200"
                            show-overflow-tooltip></el-table-column>
                        <el-table-column prop="reason" label="原因" min-width="200"
                            show-overflow-tooltip></el-table-column>
                        <el-table-column prop="monitorStatus" label="监控状态" min-width="200"
                            show-overflow-tooltip></el-table-column>
                        <el-table-column prop="monitorPayload" label="监控随路数据" min-width="200"
                            show-overflow-tooltip></el-table-column>
                        <el-table-column prop="timeSpan" label="耗时(s)" min-width="100">
                            <template #default="{ row }">
                                {{ $tools.formatMs(row.timeSpan) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="startAt" label="开始时间" min-width="180"></el-table-column>
                        <el-table-column prop="endAt" label="结束时间" min-width="180"></el-table-column>
                        <el-table-column prop="createdAt" label="创建日期" min-width="180"></el-table-column>
                        <el-table-column prop="updatedAt" label="更新日期" min-width="180"></el-table-column>
                    </template>
                </TableView>
            </div>
        </template>
    </ModalDialog>
</template>

<script setup name="JobSubResultList">
const dialogFormVisible = ref(false);
const {
    table,
    page,
    useTableSearchFormSubmit,
    useTableRemove,
    useTableSearch,
    searchRef,
    useTableSearchReset,
    useTableSearchResetLoad,
    useTableDownload,
    searchForm,
} = useTable({
    api: "natsjob/api/app-job-sub-result",
    excelName: "",
    searchFields: {
        taskId: null,
        status: null,
        reason: null,
        monitorStatus: null,
        monitorPayload: null
    },
});

const subList = (taskId) => {
    searchForm.taskId = taskId
    page.current = 1
    useTableSearch();
    dialogFormVisible.value = true
}

defineExpose({
    subList
});
</script>

<style lang="scss" scoped>
.content {
    height: 60vh;
    background-color: #fff;
}
</style>
