<template>
    <TableView :data="table.data" :page="page" :search="useTableSearch">
        <template #search>
            <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchRef" label-width="80px">
                <el-form-item label="服务名" prop="name">
                    <el-input v-model.trim="searchForm.name" clearable style="width: 140px;"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 10px;">
                    <SearchBtn :onclick="useTableSearchFormSubmit" />
                    <ResetBtn :onclick="useTableSearchResetLoad" />
                </el-form-item>
            </el-form>
        </template>
        <template #header>
            <CreateBtn :onclick="createData" />
            <RefreshIconBtn :onclick="useTableSearch" />
        </template>
        <template #column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="id" label="编号" min-width="180"></el-table-column>
            <el-table-column prop="name" label="服务名" min-width="200"></el-table-column>
            <el-table-column prop="description" label="说明" min-width="200"></el-table-column>
            <el-table-column prop="namespaceId" label="命名空间编号" min-width="160"></el-table-column>
            <el-table-column prop="createdAt" label="创建日期" min-width="180"></el-table-column>
            <el-table-column prop="updatedAt" label="更新日期" min-width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="140">
                <template #default="{ row }">
                    <GridRow :span="4">
                        <div @click="editData(row)">
                            <EditIconBtn />
                        </div>
                        <div>
                            <RemoveIconBtn @confirm="useTableRemove(row.id)" />
                        </div>
                        <div>
                            <ViewIconBtn @click="jobTab(row)" />
                        </div>
                        <div @click="view(row)">
                            <RegIconBtn />
                        </div>
                    </GridRow>
                </template>
            </el-table-column>
        </template>
    </TableView>
    <AppEdit ref="editRef" @load="useTableSearch" />
    <ClientRegView ref="viewRef" />
</template>

<script setup name="AppList">
import { nsId, nsName } from "@/hooks/namespace"
import { watch } from "vue"
const editRef = ref()
const viewRef = ref()
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
    searchForm
} = useTable(
    {
        api: 'natsjob/api/app',
        excelName: '',
        searchFields: {
            namespaceId: nsId.value,
            name: null
        }
    }
)

onMounted(() => {
    useTableSearch()
})

const createData = () => {
    editRef.value.createData({
        namespaceId: nsId.value,
    })
}

const editData = (row) => {
    editRef.value.editData(row)
}

const router = useRouter();
const jobTab = (row) => {
    router.push({
        name: "JobList",
        params: {
            cmd: "detail",
            namespaceId: nsId.value,
            appId: row.id
        },
        // query: {
        //     cmd: "list",
        //     id: row.id,
        // },
        meta: {
            title: "任务列表",
        },
    });
}

watch(nsId, () => {
    searchForm.namespaceId = nsId.value
    useTableSearch()
})

const view = (row) => {
    viewRef.value.view(nsName, row.name)
}


</script>

<style lang="scss" scoped></style>