<template>
    <TableView :data="table.data" :page="page" :search="useTableSearch">
        <template #search>
            <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchRef" label-width="80px" @keyup.enter="useTableSearchFormSubmit">
                <el-form-item label="服务名" prop="name">
                    <el-input v-model.trim="searchForm.name" clearable style="width: 140px"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <JobStatus v-model="searchForm.status" />

                </el-form-item>
                <el-form-item label="分类" prop="category">
                    <JobCategory v-model="searchForm.category" />
                </el-form-item>
                <el-form-item label="模式" prop="model">
                    <JobModel v-model="searchForm.model" v-model:category="searchForm.category" />
                </el-form-item>
                <el-form-item style="margin-left: 10px">
                    <SearchBtn :onclick="useTableSearchFormSubmit" />
                    <ResetBtn :onclick="useTableSearchResetLoad" />
                </el-form-item>
            </el-form>
        </template>
        <template #header>
            <CreateBtn :onclick="createData" />
            <RefreshIconBtn :onclick="useTableSearch" />
            <el-divider direction="vertical" />
            <n-button tertiary type="primary" round size="small">
                {{ jobName }}
            </n-button>
            <el-divider direction="vertical" />
            <el-tooltip effect="dark" placement="top">
                <template #content>
                    执行任务与标准下发策略完全相同, 不符合条件不会执行<br />
                    例如: 超过并发数,无注册服务,非主节点等
                </template>
                <i class="ri-question-line ri-xl" style="color: gray;"> </i>
            </el-tooltip>
        </template>
        <template #column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="id" label="编号" min-width="180"></el-table-column>
            <el-table-column prop="name" label="任务名" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="description" label="说明" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="状态" min-width="120">
                <template #default="{ row }">
                    <!-- <JobStatusTags v-model="row.status" /> -->
                    <el-switch v-model="row.status" inline-prompt
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" :active-value="0"
                        :inactive-value="1" active-text="启用" inactive-text="停用"
                        @change="handleSwitchStatusChange(row)" />
                </template>
            </el-table-column>
            <el-table-column prop="cron" label="定时" min-width="160"></el-table-column>
            <el-table-column prop="category" label="分类" min-width="140">
                <template #default="{ row }">
                    <JobCategoryLabel v-model="row.category" />
                </template>
            </el-table-column>
            <el-table-column prop="model" label="模式" min-width="120" show-overflow-tooltip>
                <template #default="{ row }">
                    <JobModelLabel v-model="row.model" />
                </template>
            </el-table-column>
            <el-table-column prop="subjectModel" label="主题模式" min-width="140">
                <template #default="{ row }">
                    <SubjectModelLabel v-model="row.subjectModel" />
                </template>
            </el-table-column>
            <el-table-column prop="maxWorkers" label="最大并发" min-width="120"></el-table-column>
            <el-table-column prop="timeoutSeconds" label="超时时间(秒)" min-width="120"></el-table-column>
            <el-table-column prop="conditionValue" label="条件" min-width="140">
                <template #default="{ row }">
                    <JobConditionLabel v-model="row.conditionValue" />
                </template>
            </el-table-column>
            <el-table-column prop="args" label="参数" min-width="120" show-overflow-tooltip></el-table-column>``
            <!-- <el-table-column prop="startAt" label="开始时间" min-width="200"></el-table-column>
            <el-table-column prop="endAt" label="结束时间" min-width="200"></el-table-column> -->

            <el-table-column prop="appId" label="服务编号" min-width="180"></el-table-column>
            <el-table-column prop="namespaceId" label="命名空间编号" min-width="180"></el-table-column>
            <el-table-column prop="createdAt" label="创建日期" min-width="180"></el-table-column>
            <el-table-column prop="updatedAt" label="更新日期" min-width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template #default="{ row }">
                    <GridRow :span="4">
                        <div @click="editData(row)">
                            <EditIconBtn />
                        </div>
                        <div>
                            <RemoveIconBtn @confirm="useTableRemove(row.id)" />
                        </div>
                        <div>
                            <ViewIconBtn @click="jobResultTab(row)" />
                        </div>
                        <div>
                            <el-button text bg type="success" @click="jobSend(row)">
                                执行
                            </el-button>
                        </div>
                    </GridRow>
                </template>
            </el-table-column>
        </template>
    </TableView>
    <JobEdit ref="editRef" @load="useTableSearch" />
</template>

<script setup name="JobList">
const route = useRoute();
const editRef = ref();
const jobName = ref(route.params.jobName)
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
    api: "natsjob/api/app-job",
    excelName: "",
    searchFields: {
        appId: route.params.appId,
        namespaceId: route.params.namespaceId,
        name: null,
        status: null,
        category: null,
        model: null,
    },
});

onMounted(() => {
    useTableSearch();
});

const createData = () => {
    editRef.value.createData({
        namespaceId: route.params.namespaceId,
        appId: route.params.appId,
        jobName: route.params.jobName,
    });
};

const editData = (row) => {
    editRef.value.editData(row, route.params.jobName);
};
const router = useRouter();
const jobResultTab = (row) => {
    router.push({
        name: "JobResultList",
        params: {
            cmd: "detail",
            jobId: row.id,
            jobName: jobName.value
        },
        meta: {
            title: "任务结果列表",
        },
    });
}

const jobSend = async (row) => {
    const res = await $post("natsjob/api/app-job/send", { id: row.id })
    res ? $success("发送成功") : $error("发送失败)")
}

watch(searchForm, (newVal, oldVal) => {
    if (searchForm.category == "map" && searchForm.model == "ultra") {
        searchForm.model = ""
    }
})

const handleSwitchStatusChange = async (row) => {
    const urlStatus = row.status == 0 ? "status-enable" : "status-disable"
    const res = await $post(`natsjob/api/app-job/${urlStatus}`, {
        id: row.id
    })
    res ? $success("操作成功") : $error("操作失败")
    useTableSearch()
}

</script>

<style lang="scss" scoped></style>