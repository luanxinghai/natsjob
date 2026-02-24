import { converToUrl, isObject } from "@/utils/tools"
export const useForm = (
  config = {
    api: "",
    success: () => {},
    fail: () => {},
    createSuccess: () => {},
    createFail: () => {},
    updateSuccess: () => {},
    updateFail: () => {},
    formFields: {},
    rules,
  },
) => {
  const apiPath = {
    create: "create",
    update: "update",
    save: "save",
    get: "get",
  }

  const formRef = ref()
  const form = reactive({})
  const formFields = config.formFields ?? {}
  const rules = reactive(config.rules ?? {})

  useFormClone(form, formFields)

  const setFormApiPath = (apiPathObj = {}) => {
    Object.keys(apiPathObj).map((key) => {
      apiPath[key] = apiPathObj[key]
    })
  }

  const useFormSave = async (options = {}) => {
    const { path, onSuccess, onFail, successMsg, failMsg } = options
    // formRef.value.resetFields()
    let apiPathValue = getApiPath(path, apiPath.save)
    return await useSaveData(form, {
      path: apiPathValue,
      onSuccess: onSuccess ? onSuccess : config.success,
      onFail: onFail ? onFail : config.fail,
      successMsg: successMsg ? successMsg : "保存成功",
      failMsg: failMsg ? failMsg : "保存失败",
    })
  }

  const useFormCreate = async (options = {}) => {
    const { path, onSuccess, onFail, successMsg, failMsg } = options
    let apiPathValue = getApiPath(path, apiPath.create)
    return await useSaveData(form, {
      path: apiPathValue,
      onSuccess: onSuccess ? onSuccess : config.createSuccess,
      onFail: onFail ? onFail : config.createFail,
      successMsg: successMsg ? successMsg : "创建成功",
      failMsg: failMsg ? failMsg : "创建失败",
    })
  }

  const useFormUpdate = async (options = {}) => {
    const { path, onSuccess, onFail, successMsg, failMsg } = options
    let apiPathValue = getApiPath(path, apiPath.update)
    return await useSaveData(form, {
      path: apiPathValue,
      onSuccess: onSuccess ? onSuccess : config.updateSuccess,
      onFail: onFail ? onFail : config.updateFail,
      successMsg: successMsg ? successMsg : "修改成功",
      failMsg: failMsg ? failMsg : "修改失败",
    })
  }

  const useSaveData = async (
    form,
    { path, onSuccess, onFail, successMsg, failMsg },
  ) => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        const res = await $post(`${config.api}/${path}`, form)
        if (res && res != "") {
          $success(successMsg)
          if (onSuccess) {
            onSuccess(res)
          }
          return
        }

        $error(res?.message ?? failMsg)
        if (onFail) {
          onFail(res)
        }
      } else {
        $error("有条件不合法,请验证哦~")
        return false
      }
    })
  }

  const useFormGetById = async (apiPathValue = apiPath.get, id) => {
    return await $get(`${config.api}/${apiPathValue}/${id}`)
  }

  const useFormPostById = async (apiPathValue = apiPath.get, id) => {
    return await $post(`${config.api}/${apiPathValue}`, { id })
  }

  const useFormPost = async (
    apiPathValue = "custom-form-post",
    params = {},
  ) => {
    return await $post(`${config.api}/${apiPathValue}`, params)
  }

  const useFormPostPathVariable = async (
    apiPathValue = "custom-form-post-path-variable",
    params = "",
  ) => {
    return await $post(`${config.api}/${apiPathValue}/${params}`)
  }

  const useFormGet = async (apiPathValue = "custom-form-get", params = {}) => {
    return await $get(`${config.api}/${apiPathValue}` + converToUrl(params))
  }

  const useFormGetPathVariable = async (
    apiPathValue = "custom-form-get-path-variable",
    params = "",
  ) => {
    return await $get(`${config.api}/${apiPathValue}/${params}`)
  }

  const getApiPath = (configPath, defaultApiPath) => {
    if (typeof configPath == "string" && configPath != "") {
      return configPath
    }
    return defaultApiPath
  }

  const useFormById = async (id, filedSkipNullMap) => {
    formRef.value?.resetFields()
    if (id) {
      const res = await useFormPostById(apiPath.get, id)
      useFormClone(form, res, filedSkipNullMap)
    } else {
      useFormClone(form, formFields)
    }
  }

  const useFormResetValue = (vals = {}, isUseFormClone = true) => {
    useFormResetFields()
    Object.keys(vals).map((key) => {
      let itemValue = vals[key]
      formFields[key] = itemValue
      form[key] = itemValue
    })
    if (isUseFormClone) {
      useFormClone(form, formFields)
    }
  }

  const useFormSetValue = (vals = {}) => {
    Object.keys(vals).map((key) => {
      let value = vals[key]
      if (value) {
        form[key] = value
      }
    })
  }

  const useFormResetFields = () => {
    formRef.value?.resetFields()
  }

  return {
    rules,
    formRef,
    form,
    useFormSave,
    useFormCreate,
    useFormUpdate,
    useFormGetById,
    useFormPostById,
    setFormApiPath,
    useFormPost,
    useFormPostPathVariable,
    useFormGet,
    useFormGetPathVariable,
    useFormById,
    useFormResetValue,
    useFormSetValue,
    useFormResetFields,
  }
}

export const useFormClone = (formRef, formValues = {}, filedSkipNullSet) => {
  if (filedSkipNullSet && filedSkipNullSet.size > 0) {
    Object.keys(formValues).forEach((key) => {
      let itemValue = formValues[key]
      if (filedSkipNullSet.has(key) && itemValue == null) {
        return
      }
      formRef[key] = itemValue
    })
    return
  }

  Object.keys(formValues).forEach((key) => {
    formRef[key] = formValues[key]
  })
}
