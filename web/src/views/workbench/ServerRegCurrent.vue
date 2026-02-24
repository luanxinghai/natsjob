<template>
    <n-card title="当前服务端注册">
        <template #header-extra>
            <n-countdown ref="countdown" :duration="10000" :active="true" :on-finish="onFinish" />
            <SpaceGap />
            <i class="ri-loop-left-ai-line ri-lg" style="cursor: pointer;" @click="getData"></i>
        </template>
        <el-descriptions class="margin-top" :column="2" border label-width="120px">
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        ip
                    </div>
                </template>
                {{ data?.systemInfo?.machineIp }}
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        id
                    </div>
                </template>
                {{ data.id }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        开始时间
                    </div>
                </template>
                {{ data.startTime }}
            </el-descriptions-item>


            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        心跳时间
                    </div>
                </template>
                {{ data.updateTime }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        节点类型
                    </div>
                </template>
                <div class="d-success" v-if="data.isMaster">
                    <Dot type="success" />
                    主节点
                </div>
                <div class="d-danger" v-else>
                    <Dot type="danger" />
                    从节点
                </div>
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        nats状态
                    </div>
                </template>
                <div class="d-success" v-if="data.natsConnect">
                    <Dot type="success" />
                    正常连接
                </div>
                <div class="d-danger" v-else>
                    <Dot type="danger" />
                    连接断开
                </div>
            </el-descriptions-item>
        </el-descriptions>


    </n-card>
</template>

<script setup>
import { dividerDark } from 'naive-ui'

const countdown = ref(null)
const data = ref({
    id: "",
    startTime: "",
    updateTime: "",
    isMaster: false,
})
const getData = async () => {
    const res = await $post("natsjob/api/console/current-server-reg")
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
