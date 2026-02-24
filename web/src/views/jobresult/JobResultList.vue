<template>
    <TableView :data="table.data" :page="page" :search="useTableSearch">
        <template #search>
            <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchRef" label-width="120px">
                <el-form-item label="状态" prop="status">
                    <el-input v-model.trim="searchForm.status" clearable style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item label="原因" prop="reason">
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
        </template>
        <template #column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="id" label="编号" min-width="180"></el-table-column>
            <el-table-column prop="status" label="状态" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="reason" label="原因" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="monitorStatus" label="监控状态" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="monitorPayload" label="监控随路数据" min-width="200"
                show-overflow-tooltip></el-table-column>
            <el-table-column prop="timeSpan" label="耗时(ms)" min-width="100">
                <template #default="{ row }">
                    {{ $tools.formatMs(row.timeSpan) }}
                </template>
            </el-table-column>
            <el-table-column prop="startAt" label="开始时间" min-width="180"></el-table-column>
            <el-table-column prop="endAt" label="结束时间" min-width="180"></el-table-column>
            <el-table-column prop="expiredAt" label="过期时间" min-width="180"></el-table-column>
            <el-table-column prop="category" label="分类" min-width="120">
                <template #default="{ row }">
                    <JobCategoryLabel v-model="row.category" />
                </template>
            </el-table-column>
            <el-table-column prop="model" label="模式" min-width="120">
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
            <el-table-column fixed="right" label="操作" width="60">
                <template #default="{ row }">
                    <GridRow :span="1">
                        <div @click="showSubList(row)">
                            <ViewSubIconBtn />
                        </div>
                    </GridRow>
                </template>
            </el-table-column>
        </template>
    </TableView>
    <JobSubResultList ref="subResultListRef" @load="useTableSearch" />
</template>

<script setup name="JobResultList">
const router = useRoute();
const subResultListRef = ref();
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

onMounted(() => {
    useTableSearch();
});

const showSubList = (row) => {
    subResultListRef.value.subList(row.id)
}

</script>

<style lang="scss" scoped></style>
