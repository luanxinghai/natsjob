<template>
    <el-dialog v-model="dialogFormVisible" title="服务端详情" width="60%" draggable destroy-on-close center>
        <n-card title="服务器信息">
            <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            ip
                        </div>
                    </template>
                    {{ data.machineIp }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            hostname
                        </div>
                    </template>
                    {{ data.machineHostname }}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            系统
                        </div>
                    </template>
                    {{ data.machineOs }}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            架构
                        </div>
                    </template>
                    {{ data.machineArchitecture }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            CPU
                        </div>
                    </template>
                    核数: {{ data.machineCpuCores }}<el-divider direction="vertical" />
                    使用率:{{ data.machineCpuUsage }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            内存
                        </div>
                    </template>
                    总共: {{ data.machineMemoryTotal }}<el-divider direction="vertical" />
                    已使用: {{ data.machineMemoryUsed }} <el-divider direction="vertical" />
                    使用率:{{ data.machineMemoryUsage }}
                </el-descriptions-item>
            </el-descriptions>
        </n-card>
        <div style="height: 20px;"></div>
        <n-card title="程序信息">
            <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            进程id
                        </div>
                    </template>
                    {{ data.processPid }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            进程名
                        </div>
                    </template>
                    {{ data.processName }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            cpu
                        </div>
                    </template>
                    {{ data.processCpuUsage }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            内存
                        </div>
                    </template>
                    {{ data.processMemoryRss }}
                </el-descriptions-item>
            </el-descriptions>
        </n-card>
    </el-dialog>
</template>

<script setup>
const data = ref({})
const dialogFormVisible = ref(false);

const view = (systemInfo) => {
    data.value = systemInfo
    dialogFormVisible.value = true;
}

defineExpose({
    view
})
</script>

<style lang="scss" scoped></style>
