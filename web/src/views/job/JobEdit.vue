<template>
    <el-dialog v-model="dialogFormVisible" title="数据编辑" width="40%" draggable destroy-on-close center>
        <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
            <el-form-item label="编号" prop="id">
                {{ form.id }}
            </el-form-item>
            <GridRow>
                <el-form-item label="分类" prop="category">
                    <JobCategory v-model="form.category" />
                </el-form-item>
                <el-form-item label="模式" prop="model">
                    <JobModel v-model="form.model" v-model:category="form.category" />
                </el-form-item>
            </GridRow>
            <el-form-item label="任务名" prop="name">
                <el-input v-model.trim="form.name" autocomplete="off" maxlength="64" show-word-limit />
            </el-form-item>
            <el-form-item label="说明" prop="description">
                <el-input v-model.trim="form.description" autocomplete="off" maxlength="64" show-word-limit />
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <JobStatus v-model="form.status" />
            </el-form-item>
            <GridRow>
                <el-form-item label="定时" prop="cron">
                    <el-input v-model.trim="form.cron" autocomplete="off" maxlength="64" />
                </el-form-item>
                <el-form-item label="条件" prop="condition" v-if="form.category == 'standalone' && form.model == 'ultra'">
                    <JobCondition v-model="form.condition" />
                </el-form-item>
            </GridRow>
            <GridRow v-if="form.model != 'lite' && form.model != 'plus'">
                <el-form-item label="最大并发" prop="maxWorkers">
                    <el-input-number v-model="form.maxWorkers" :min="1" :max="10000" />
                </el-form-item>
                <el-form-item label="超时时间(秒)" prop="timeoutSeconds">
                    <el-input-number v-model="form.timeoutSeconds" :min="1" :max="86400" />
                </el-form-item>
            </GridRow>
            <el-form-item label="参数" prop="args">
                <el-input type="textarea" v-model.trim="form.args" autocomplete="off" maxlength="1000"
                    show-word-limit />
            </el-form-item>
            <GridRow>
                <el-form-item label="创建日期">
                    {{ form.createdAt }}
                </el-form-item>
                <el-form-item label="更新日期">
                    {{ form.updatedAt }}
                </el-form-item>
            </GridRow>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="saveData"> 保存 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup name="AppEdit">
import JobCondition from '../compontent/JobCondition.vue';

const dialogFormVisible = ref(false);
const emits = defineEmits(["load"]);
const editModel = ref(false)
const success = () => {
    dialogFormVisible.value = false;
    emits("load");
};

const {
    useFormSave,
    useFormCreate,
    useFormUpdate,
    form,
    formRef,
    useFormById
} = useForm(
    {
        api: "natsjob/api/app-job",
        formFields: {
            id: null,
            name: null,
            description: null,
            namespaceId: null,
            appId: null,
            category: "",
            model: "",
            status: 0,
            cron: "@every 10s",
            maxWorkers: 1,
            timeoutSeconds: 10,
            condition: "",
            args: ""
        }
    }
);
const rules = reactive({
    name: useRule(),
    status: useRule(),
    description: useRule(),
    category: useRule(),
    model: useRule(),
    cron: useRule(),
});
const createData = (data = {}) => {
    editModel.value = false
    useFormById()
    form.namespaceId = data.namespaceId
    form.appId = data.appId
    dialogFormVisible.value = true;
};

const editData = async (row) => {
    editModel.value = true
    useFormById(row.id);
    dialogFormVisible.value = true;
};


const saveData = async () => {
    editModel.value ?
        await useFormUpdate({
            onSuccess: (res) => {
                success()
            }
        })
        : await useFormCreate({
            onSuccess: (res) => {
                success()
            }
        })
}

defineExpose({
    createData,
    editData,
});

watch(form, (newVal, oldVal) => {
    if (form.category == "map" && form.model == "ultra") {
        form.model = ""
    }

    if (form.category == "standalone" && form.model == "ultra") {
    } else {
        form.condition = ""
    }
})
</script>

<style lang="scss" scoped>
.content {
    padding: 10px;
    max-height: 60vh;
    overflow: auto;
    background-color: #fff;
}
</style>
