<template>
    <TableView :data="table.data" :page="page" :search="useTableSearch">
        <template #search>
            <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchRef" label-width="120px"
                @keyup.enter="useTableSearchFormSubmit">
                <el-form-item label="状态" prop="status">
                    <el-input v-model.trim="searchForm.status" clearable style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="reason">
                    <el-input v-model.trim="searchForm.reason" clearable style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item label="监控状态" prop="monitorStatus">
                    <el-input v-model.trim="searchForm.monitorStatus" clearable style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item label="监控随路数据" prop="monitorPayload">
                    <el-input v-model.trim="searchForm.monitorPayload" clearable style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 10px">
                    <SearchBtn :onclick="useTableSearchFormSubmit" />
                    <ResetBtn :onclick="useTableSearchResetLoad" />
                </el-form-item>
            </el-form>
        </template>
        <template #header>
            <RefreshIconBtn :onclick="useTableSearch" />
            <el-divider direction="vertical" />
            <n-button tertiary type="primary" round size="small">
                {{ jobName }}
            </n-button>
            <el-divider direction="vertical" />
            <div class="stat-panel">
                <div class="result-stat">
                    <span class="stat-item stat-success">成功 {{ stat.success }}</span>
                    <span class="stat-item stat-fail">失败 {{ stat.fail }}</span>
                    <span class="stat-item stat-expired">过期 {{ stat.expired }}</span>
                    <span class="stat-item stat-cancel">取消 {{ stat.cancel }}</span>
                </div>
                <SpaceGap />
                <n-button size="small" @click="loadStat">
                    刷新统计
                </n-button>
            </div>
        </template>
        <template #column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="id" label="编号" min-width="180"></el-table-column>
            <el-table-column prop="status" label="状态" min-width="100" show-overflow-tooltip>
                <template #default="{ row }">
                    <el-text v-if="row.status == 'success'" type="success">{{ row.status }}</el-text>
                    <el-text v-else-if="row.status == 'fail'" type="danger">{{ row.status }}</el-text>
                    <el-text v-else-if="row.status == 'expired'" type="warning">{{ row.status }}</el-text>
                    <el-text v-else-if="row.status == 'cancel'" type="info">{{ row.status }}</el-text>
                    <span v-else>{{ row.status }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="reason" label="说明" min-width="200" show-overflow-tooltip></el-table-column>

            <el-table-column prop="timeSpan" label="耗时" min-width="120">
                <template #default="{ row }">
                    {{ $tools.formatMs(row.timeSpan) }}
                </template>
            </el-table-column>
            <el-table-column prop="startAt" label="开始时间" min-width="180"></el-table-column>
            <el-table-column prop="endAt" label="结束时间" min-width="180"></el-table-column>
            <el-table-column prop="expiredAt" label="过期时间" min-width="180"></el-table-column>
            <el-table-column prop="clientId" label="客户端ID" min-width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="monitorStatus" label="监控状态" min-width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="monitorPayload" label="监控随路数据" min-width="120"
                show-overflow-tooltip></el-table-column>

            <el-table-column prop="category" label="分类" min-width="120">
                <template #default="{ row }">
                    <JobCategoryLabel v-model="row.category" />
                </template>
            </el-table-column>
            <el-table-column prop="model" label="模式" min-width="120" show-overflow-tooltip>
                <template #default="{ row }">
                    <JobModelLabel v-model="row.model" />
                </template>
            </el-table-column>
            <el-table-column prop="jobName" label="任务名" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jobId" label="任务编号" min-width="180"></el-table-column>
            <el-table-column prop="appId" label="服务编号" min-width="180"></el-table-column>
            <el-table-column prop="namespaceId" label="命名空间编号" min-width="180"></el-table-column>
            <el-table-column prop="createdAt" label="创建日期" min-width="180"></el-table-column>
            <el-table-column prop="updatedAt" label="更新日期" min-width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
                <template #default="{ row }">
                    <GridRow :span="3">
                        <div @click="showSubList(row)">
                            <ViewSubIconBtn />
                        </div>
                        <div @click="showDetail(row)">
                            <DetailIconBtn />
                        </div>
                        <div>
                            <n-button v-if="row.status === 'create'" size="small" type="error" tertiary
                                @click="cancelTask(row)">
                                取消
                            </n-button>
                        </div>
                    </GridRow>
                </template>
            </el-table-column>
        </template>
    </TableView>
    <JobSubResultList ref="subResultListRef" @load="useTableSearch" />
    <JobResultDetail ref="resultDetailRef" />
</template>

<script setup name="JobResultList">
import { ElMessageBox } from "element-plus"
import { post } from "@/utils/fetch"
import { $success } from "@/utils/alert"

const router = useRoute();
const subResultListRef = ref();
const resultDetailRef = ref();
const jobName = ref(router.params.jobName)
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
    useTablePost,
    searchForm,
} = useTable({
    api: "natsjob/api/app-job-result",
    excelName: "",
    searchFields: {
        jobId: router.params.jobId,
        status: null,
        reason: null,
        monitorStatus: null,
        monitorPayload: null
    },
});

// 各状态统计
const stat = reactive({
    success: 0,
    fail: 0,
    expired: 0,
    cancel: 0,
})

const loadStat = async () => {
    try {
        const res = await post("natsjob/api/app-job-result/stat", {
            jobId: router.params.jobId,
            reason: searchForm.reason,
            monitorStatus: searchForm.monitorStatus,
            monitorPayload: searchForm.monitorPayload,
        })
        if (res) {
            stat.success = res.success ?? 0
            stat.fail = res.fail ?? 0
            stat.expired = res.expired ?? 0
            stat.cancel = res.cancel ?? 0
        }
    } catch (e) {
        console.error("load stat error", e)
    }
}

onMounted(() => {
    useTableSearch();
    loadStat();
});

const showSubList = (row) => {
    subResultListRef.value.subList(row.id)
}

const showDetail = (row) => {
    resultDetailRef.value.open(row)
}

// 取消运行中的任务
const cancelTask = (row) => {
    ElMessageBox.confirm(
        `确认取消任务「${row.jobName}」(编号 ${row.id})？取消后任务状态将标记为 cancel。`,
        "取消任务",
        {
            confirmButtonText: "确定取消",
            cancelButtonText: "暂不取消",
            type: "warning",
        }
    ).then(async () => {
        try {
            await useTablePost("cancel", { id: row.id })
            $success("任务已取消")
        } catch (e) {
            // 失败信息由全局拦截器提示
        } finally {
            useTableSearch()
            loadStat()
        }
    }).catch(() => { })
}

</script>

<style lang="scss" scoped>
.stat-panel {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 4px 12px;
    background: #f5f7fa;
    // border: 1px solid #e4e7ed;
    border-radius: 8px;
}

.result-stat {
    display: inline-flex;
    align-items: center;
    gap: 12px;

    .stat-item {
        font-size: 13px;
        padding: 2px 10px;
        border-radius: 12px;
        line-height: 20px;
        white-space: nowrap;
    }

    .stat-success {
        color: #67c23a;
        background: #f0f9eb;
    }

    .stat-fail {
        color: #f56c6c;
        background: #fef0f0;
    }

    .stat-expired {
        color: #e6a23c;
        background: #fdf6ec;
    }

    .stat-cancel {
        color: #909399;
        background: #f4f4f5;
    }
}

.op-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}
</style>
