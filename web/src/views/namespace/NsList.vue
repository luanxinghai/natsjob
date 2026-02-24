<template>
    <TableView :data="table.data" :page="page" :search="useTableSearch">
        <template #header>
            <CreateBtn :onclick="createData" />
            <RefreshIconBtn :onclick="useTableSearch" />
        </template>
        <template #column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="id" label="编号" min-width="180"></el-table-column>
            <el-table-column prop="name" label="命名空间" min-width="200"></el-table-column>
            <el-table-column prop="description" label="说明" min-width="200"></el-table-column>
            <el-table-column prop="createdAt" label="创建日期" min-width="180"></el-table-column>
            <el-table-column prop="updatedAt" label="更新日期" min-width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="90">
                <template #default="{ row }">
                    <GridRow v-if="row.id != 1">
                        <div @click="editData(row)">
                            <EditIconBtn />
                        </div>
                        <div>
                            <RemoveIconBtn @confirm="removeData(row.id)" />
                        </div>
                    </GridRow>
                </template>
            </el-table-column>
        </template>
    </TableView>
    <NsEdit ref="editRef" @load="loadData" />
</template>

<script setup name="NsList">
import { nsUpdate } from "@/hooks/namespace"
const editRef = ref()
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
        api: 'natsjob/api/namespace',
        excelName: '',
        searchFields: {
        }
    }
)

onMounted(() => {
    useTableSearch()
})

const createData = () => {
    editRef.value.createData()
}

const editData = (row) => {
    editRef.value.editData(row)
}

const loadData = async () => {
    await useTableSearch()
    nsUpdate.value = Date.now() + ""
}

const removeData = async (row) => {
    await useTableRemove(row)
    nsUpdate.value = Date.now() + ""
}

</script>

<style lang="scss" scoped></style>
