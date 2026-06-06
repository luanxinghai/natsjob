<template>
    <TableView :data="dataGet" :page="page" :search="useTableSearch" :pagination="false">
        <template #header>
            客户端注册({{ nsName }})
            <el-divider direction="vertical" />
            数量: {{ dataGet.length }}
            <el-divider direction="vertical" />
            <el-input v-model="searchKey" placeholder="服务名/客户端ip快速搜索" clearable style="width: 300px" />
            <el-divider direction="vertical" />
            <RefreshIconBtn :onclick="getData" />
        </template>
        <template #column>
            <el-table-column prop="namespace" label="命名空间" min-width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="appName" label="服务" min-width="180"></el-table-column>
            <el-table-column prop="clientRegs" label="注册数" min-width="90">
                <template #default="{ row }">
                    {{ row.clientRegs ? row.clientRegs.length : 0 }}
                </template>
            </el-table-column>
            <el-table-column prop="clientRegs" label="客户端ip(第一个)" min-width="200">
                <template #default="{ row }">
                    {{ row.clientRegs ? row.clientRegs[0].ip : "-" }}
                </template>
            </el-table-column>
            <el-table-column prop="clientRegs" label="开始时间(第一个)" min-width="200">
                <template #default="{ row }">
                    {{ row.clientRegs ? row.clientRegs[0].startTime : "-" }}
                </template>
            </el-table-column>
            <el-table-column prop="clientRegs" label="心跳时间(第一个)" min-width="200">
                <template #default="{ row }">
                    {{ row.clientRegs ? row.clientRegs[0].updateTime : "-" }}
                </template>
            </el-table-column>
            <el-table-column prop="clientRegs" label="权重(第一个)" min-width="200">
                <template #default="{ row }">
                    {{ row.clientRegs ? row.clientRegs[0].weight : "-" }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="60">
                <template #default="{ row }">
                    <GridRow :span="1">
                        <RegIconBtn @click="view(row)" />
                    </GridRow>
                </template>
            </el-table-column>
        </template>
    </TableView>
    <ClientRegView ref="viewRef" />
</template>

<script setup name="ClientRegList">
import { nsId, nsName } from "@/hooks/namespace"
const countdown = ref(null)
const searchKey = ref("")

const searchFields = reactive({
    namespace: nsName
})
const data = ref([])
const getData = async () => {
    searchFields.namespace = nsName
    const res = await $post("natsjob/api/console/client-reg-ns", searchFields)
    data.value = res || []
}

const dataGet = computed(() => {
    return data.value.filter(item => item.appName.includes(searchKey.value) || item.clientRegs?.some(reg => reg.ip.includes(searchKey.value)))
})



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