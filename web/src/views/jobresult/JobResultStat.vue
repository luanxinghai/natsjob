<template>
    <div class="job-result-stat">
        <el-button @click="open" dashed plain>
            <template #icon>
                <i class="ri-bar-chart-2-line stat-icon"></i>
            </template>
            统计
        </el-button>

        <el-dialog v-model="visible" title="任务结果统计" width="500px" align-center center :close-on-click-modal="true"
            append-to-body>
            <div v-if="loading" class="stat-loading">
                <el-icon class="is-loading">
                    <i class="ri-loader-4-line"></i>
                </el-icon>
                统计中…
            </div>
            <template v-else>
                <ul class="stat-list">
                    <li v-for="item in rows" :key="item.value" class="stat-row">
                        <span class="name">
                            {{ item.label }}
                            <i class="en">{{ item.value }}</i>
                        </span>
                        <span class="count" :style="{ color: item.color }">{{ item.count }}</span>
                    </li>
                </ul>
                <div class="stat-summary">
                    <span class="summary-total">合计 <b>{{ total }}</b> 条</span>
                </div>
            </template>
            <template #footer>
                <div class="stat-footer-center">
                    <el-button text @click="visible = false">关闭</el-button>
                    <el-button type="primary" @click="refreshData">刷新</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="JobResultStat">
import { ref, reactive, computed } from "vue"
import { post } from "@/utils/fetch"

const props = defineProps({
    jobId: { type: [String, Number], required: true },
    jobName: { type: String, default: "" },
    reason: { type: String, default: "" },
    monitorStatus: { type: String, default: "" },
    monitorPayload: { type: String, default: "" },
})

const visible = ref(false)
const loading = ref(false)

// 状态枚举：中文说明 / 英文状态值 / 颜色
const META = [
    { label: "运行中", value: "create", color: "#409eff" },
    { label: "成功", value: "success", color: "#67c23a" },
    { label: "失败", value: "fail", color: "#f56c6c" },
    { label: "过期", value: "expired", color: "#e6a23c" },
    { label: "取消", value: "cancel", color: "#909399" },
]

const data = reactive({
    create: 0,
    success: 0,
    fail: 0,
    expired: 0,
    cancel: 0,
})

const rows = computed(() => META.map((m) => ({ ...m, count: data[m.value] ?? 0 })))
const total = computed(() => rows.value.reduce((s, r) => s + r.count, 0))

// 直接请求后端拉取统计数据（不切换 loading，列表原地更新，弹窗不闪动）
const fetchStat = async () => {
    const res = await post("natsjob/api/app-job-result/stat", {
        jobId: props.jobId,
        reason: props.reason,
        monitorStatus: props.monitorStatus,
        monitorPayload: props.monitorPayload,
    })
    if (res) {
        META.forEach((m) => {
            data[m.value] = res[m.value] ?? 0
        })
    }
}

// 首次打开：带 loading 占位
const load = async () => {
    loading.value = true
    try {
        await fetchStat()
    } catch (e) {
        console.error("load stat error", e)
    } finally {
        loading.value = false
    }
}

// 刷新：直接调后端，列表原地更新（不闪烁）
const refreshData = async () => {
    try {
        await fetchStat()
    } catch (e) {
        console.error("refresh stat error", e)
    }
}

// 打开即统计（懒加载，避免无谓请求）
const open = () => {
    visible.value = true
    load()
}

// 仅当弹窗已打开时刷新（供父组件在取消等操作后调用）
const refresh = () => {
    if (visible.value) refreshData()
}

defineExpose({ open, refresh })
</script>

<style lang="scss" scoped>
.job-result-stat {
    display: inline-flex;
    align-items: center;
}

.stat-icon {
    font-size: 14px;
    line-height: 1;
    vertical-align: -1px;
}

.stat-summary {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    margin-top: 14px;
    font-size: 13px;
    color: #909399;

    .summary-total b {
        color: #303133;
        font-size: 16px;
    }
}

.stat-list {
    list-style: none;
    margin: 0;
    padding: 0;

    .stat-row {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: 16px;
        padding: 10px 4px;
        border-bottom: 1px solid #f2f3f5;

        &:last-child {
            border-bottom: none;
        }

        .name {
            color: #303133;
            font-size: 14px;
            text-align: left;

            .en {
                margin-left: 8px;
                color: #909399;
                font-size: 12px;
                font-style: normal;
                font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            }
        }

        .count {
            font-size: 16px;
            font-weight: 600;
            text-align: right;
        }
    }
}

.stat-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 40px 0;
    color: #909399;
    font-size: 13px;
}

// 底部按钮居中（footer 插槽内容属本组件作用域，scoped 样式可命中）
.stat-footer-center {
    text-align: center;
}
</style>
