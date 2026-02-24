<template>
    <el-dialog v-model="dialogFormVisible" title="数据编辑" width="40%" draggable destroy-on-close center>
        <div class="content">
            <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
                <el-form-item label="编号" prop="id">
                    {{ form.id }}
                </el-form-item>
                <el-form-item label="命名空间" prop="name">
                    <el-input v-model.trim="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="说明" prop="description">
                    <el-input v-model.trim="form.description" autocomplete="off" />
                </el-form-item>
                <el-form-item label="创建日期">
                    {{ form.createdAt }}
                </el-form-item>
                <el-form-item label="更新日期">
                    {{ form.updatedAt }}
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="saveData"> 保存 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup name="NsEdit">
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
        api: "natsjob/api/namespace",
        formFields: {
            id: null,
            name: null,
            description: null,
        }
    }
);

const createData = () => {
    editModel.value = false
    useFormById()
    dialogFormVisible.value = true;
};

const editData = async (row) => {
    editModel.value = true
    useFormById(row.id);
    dialogFormVisible.value = true;
};
const rules = reactive({
    name: useRule(),
    description: useRule()
});

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
</script>

<style lang="scss" scoped>
.content {
    padding: 10px;
    max-height: 60vh;
    overflow: auto;
    background-color: #fff;
}
</style>
