<template>
    <el-dialog v-model="dialogFormVisible" title="客户端注册详情" width="60%" draggable destroy-on-close center>
        <el-empty :image-size="200" v-if="data.length === 0" />
        <template v-for="item in data">
            <n-card :title="item.id">
                <el-descriptions class="margin-top" :column="2" border>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                命名空间
                            </div>
                        </template>
                        {{ item.namespace }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                服务
                            </div>
                        </template>
                        {{ item.appName }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                ip
                            </div>
                        </template>
                        {{ item.ip }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                权重
                            </div>
                        </template>
                        {{ item.weight }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                开始时间
                            </div>
                        </template>
                        {{ item.startTime }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                更新时间
                            </div>
                        </template>
                        {{ item.updateTime }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                机器CPU/内存使用率
                            </div>
                        </template>
                        {{ item.machineCpuUsage }}<el-divider direction="vertical" />
                        {{ item.machineMemoryUsage }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                客户端cpu使用率/内存占用
                            </div>
                        </template>
                        {{ item.processCpuUsage }}<el-divider direction="vertical" />
                        {{ item.processMemoryRss }}
                    </el-descriptions-item>
                </el-descriptions>
            </n-card>
            <div style="height:20px"></div>
        </template>
    </el-dialog>
</template>

<script setup>
const searchFields = reactive({
    namespace: "",
    appName: ""
})

const data = ref([])
const dialogFormVisible = ref(false);

const getData = async () => {
    const res = await $post("natsjob/api/console/client-reg-app", searchFields)
    data.value = res || []
}

const view = (nsName, appName) => {
    searchFields.namespace = nsName
    searchFields.appName = appName
    getData()
    dialogFormVisible.value = true;
}

defineExpose({
    view
})
</script>

<style lang="scss" scoped></style>
