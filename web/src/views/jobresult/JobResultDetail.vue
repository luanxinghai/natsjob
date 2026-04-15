<template>
    <ModalDialog title="任务结果详情" v-model="dialogVisible" width="60%" destroy-on-close draggable center>
        <template #content>
            <el-descriptions :column="2" border>
                <el-descriptions-item label="编号" :span="2">
                    {{ detail.id || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="状态">
                    <el-text v-if="detail.status == 'success'" type="success">{{ detail.status }}</el-text>
                    <el-text v-else-if="detail.status == 'fail'" type="danger">{{ detail.status }}</el-text>
                    <el-text v-else-if="detail.status == 'expired'" type="warning">{{ detail.status }}</el-text>
                    <el-text v-else>{{ detail.status || '-' }}</el-text>
                </el-descriptions-item>
                <el-descriptions-item label="说明">
                    {{ detail.reason || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="客户端ID" :span="2">
                    {{ detail.clientId || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="开始/结束时间">
                    {{ detail.startAt || '-' }} ~ {{ detail.endAt || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="耗时">
                    {{ $tools.formatMs(detail.timeSpan) }}
                </el-descriptions-item>
                <el-descriptions-item label="过期时间" :span="2">
                    {{ detail.expiredAt || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="监控状态">
                    {{ detail.monitorStatus || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="监控随路数据">
                    <el-text type="info">{{ detail.monitorPayload || '-' }}</el-text>
                </el-descriptions-item>
                <el-descriptions-item label="分类">
                    <JobCategoryLabel v-if="detail.category != null" v-model="detail.category" />
                    <span v-else>-</span>
                </el-descriptions-item>
                <el-descriptions-item label="模式">
                    <JobModelLabel v-if="detail.model != null" v-model="detail.model" />
                    <span v-else>-</span>
                </el-descriptions-item>
                <el-descriptions-item label="任务名">
                    {{ detail.jobName || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="命名空间编号">
                    {{ detail.namespaceId || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="任务编号">
                    {{ detail.jobId || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="服务编号">
                    {{ detail.appId || '-' }}
                </el-descriptions-item>

                <el-descriptions-item label="创建日期">
                    {{ detail.createdAt || '-' }}
                </el-descriptions-item>
                <el-descriptions-item label="更新日期">
                    {{ detail.updatedAt || '-' }}
                </el-descriptions-item>
            </el-descriptions>
        </template>
    </ModalDialog>
</template>

<script setup name="JobResultDetail">
const dialogVisible = ref(false)
const detail = ref({})

const open = (row) => {
    detail.value = { ...row }
    dialogVisible.value = true
}

defineExpose({ open })
</script>

<style lang="scss" scoped></style>
