<template>
    <ModalDialog title="子任务数据详情" v-model="dialogFormVisible" width="80%" destroy-on-close draggable center>
        <template #content>
            <div class="container">
                <div class="card-list-container">
                    <div v-if="table.data.length === 0" class="empty-tip">
                        <el-empty description="暂无数据" />
                    </div>
                    <template v-else>
                        <el-card v-for="(row, index) in table.data" :key="row.id" class="result-card">
                            <template #header>
                                <div class="card-header">
                                    <span class="card-index">#{{ (page.current - 1) * page.size + index + 1 }}</span>
                                    <span class="card-id">编号:{{ row.id }}</span>
                                    <el-divider direction="vertical" />
                                    <span>
                                        状态:
                                        <el-text v-if="row.status == 'success'" type="success">success</el-text>
                                        <el-text v-else-if="row.status == 'fail'" type="danger">fail</el-text>
                                        <el-text v-else-if="row.status == 'expired'" type="warning">expired</el-text>
                                        <el-text v-else type="primary">{{ row.status }}</el-text>
                                    </span>
                                    <el-divider direction="vertical" />
                                    <span> 原因: <el-text type="primary">{{ row.reason || '-' }}</el-text></span>
                                </div>
                            </template>
                            <el-descriptions :column="2" border>
                                <el-descriptions-item label="场景ID/名称">
                                    <el-text type="primary">{{ row.sceneId || '-' }}</el-text>
                                    <el-divider direction="vertical" />
                                    {{ row.sceneName || '-' }}
                                </el-descriptions-item>
                                <el-descriptions-item label="客户端ID">
                                    {{ row.clientId }}
                                </el-descriptions-item>
                                <el-descriptions-item label="监控状态">
                                    {{ row.monitorStatus || '-' }}
                                </el-descriptions-item>
                                <el-descriptions-item label="监控随路数据">
                                    <el-text type="info">{{ row.monitorPayload || '-' }}</el-text>
                                </el-descriptions-item>
                                <el-descriptions-item label="开始/结束时间">
                                    {{ row.startAt }} ~ {{ row.endAt }}
                                </el-descriptions-item>
                                <el-descriptions-item label="耗时">
                                    {{ $tools.formatMs(row.timeSpan) }}
                                </el-descriptions-item>
                                <el-descriptions-item label="创建日期">
                                    {{ row.createdAt }}
                                </el-descriptions-item>
                                <el-descriptions-item label="更新日期" :span="2">
                                    {{ row.updatedAt }}
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-card>
                    </template>
                </div>
                <div class="center pagination-wrapper">
                    <PageView :page="page" :getData="useTableSearch" />
                </div>
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

const handleSizeChange = () => {
    page.current = 1
    useTableSearch()
}

defineExpose({
    subList
});
</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 40px;
}

.card-list-container {
    // max-height: 70vh;
    height: 100%;
    overflow-y: auto;
    padding: 10px;
    border-bottom: 1px solid var(--scrm-bg-color);

    .empty-tip {
        padding: 40px 0;
        text-align: center;
    }

    .result-card {
        margin-bottom: 12px;
    }

    .pagination-wrapper {
        padding: 16px 0;
    }
}
</style>