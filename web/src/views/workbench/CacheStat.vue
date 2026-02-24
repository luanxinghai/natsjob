<template>
    <n-card title="当前服务缓存">
        <template #header-extra>
            <n-countdown ref="countdown" :duration="60000" :active="true" :on-finish="onFinish" />
            <SpaceGap />
            <i class="ri-loop-left-ai-line ri-lg" style="cursor: pointer;" @click="getData"></i>
        </template>
        <el-descriptions class="margin-top" :column="2" border label-width="120px">
            <el-descriptions-item width="300px">
                <template #label>
                    <div class="cell-item">
                        服务数
                    </div>
                </template>
                {{ data.appTotal }}
            </el-descriptions-item>
            <el-descriptions-item width="300px">
                <template #label>
                    <div class="cell-item">
                        任务数
                    </div>
                </template>
                {{ data.jobTotal }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        主缓存数
                    </div>
                </template>
                {{ data.valuesTotal }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        子缓存数
                    </div>
                </template>
                {{ data.subTotal }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        数据库并发
                    </div>
                </template>
                {{ data.dbChanTotal }}
            </el-descriptions-item>

        </el-descriptions>
    </n-card>
</template>

<script setup>
const countdown = ref(null)
const data = ref({
    id: "",
    startTime: "",
    updateTime: "",
    isMaster: false,
})
const getData = async () => {
    const res = await $post("natsjob/api/console/cache/stat")
    data.value = res
}

onMounted(() => {
    getData();
});

const onFinish = () => {
    getData();
    countdown.value?.reset()
}

</script>

<style lang="scss" scoped></style>
