import { converToUrl, isObject } from "@/utils/tools"

export const useTable = (
	config = {
		api: "",
		excelName: "数据详情.xlsx",
		page: null,
		//查询字段变量
		searchFields: {},
		rules
	}
) => {
	const apiPath = {
		search: "list",
		searchAll: "list-all",
		save: "save",
		delete: "delete",
		remove: "remove",
		batchRemove: "batch-remove",
		download: "download",
		field: "field",
		column: "column",
		stat: "stat"
	}
	const page =
		config.page ??
		reactive({
			current: 1,
			size: 10,
			total: 0,
			pageSizes: [10, 50, 100, 200]
		})
	const searchFormTemp = config.searchFields ?? {}

	//查询form的ref输出
	const searchRef = ref()
	const fields = ref([])
	const columns = ref([])
	const table = reactive({
		data: []
	})
	//规则
	const rules = reactive(config.rules ?? {})
	const searchForm = reactive({})

	//重置
	const useTableSearchReset = () => {
		useFormClone(searchForm, searchFormTemp)
	}

	//初始化时赋值一次
	useTableSearchReset()

	//重置并重载一次数据
	const useTableSearchResetLoad = () => {
		useFormClone(searchForm, searchFormTemp)
		useTableSearchFormSubmit()
	}

	//设置查询不变的值
	const useTableSearchSetValue = (vals = {}) => {
		Object.keys(vals).map((key) => {
			searchFormTemp[key] = vals[key]
			searchForm[key] = vals[key]
			//console.log(searchFormTemp, searchForm)
		})
	}

	//提交查询表单
	const useTableSearchFormSubmit = (func) => {
		_searchFormSubmit(async () => {
			typeof func === "function" ? await func() : await useTableSearch()
		})
	}

	const _searchFormSubmit = (func) => {
		if (!searchRef) {
			$error("searchRef对象未能写入组件,请检查代码")
			return
		}
		searchRef.value.validate((valid) => {
			if (valid) {
				page.current = 1
				func()
				$success("查询结束")
			} else {
				$error("查询条件不合法,请验证哦~")
				return false
			}
		})
	}

	/**
	 * 查询分页
	 */
	const useTableSearch = async (apiPathSet = apiPath.search) => {
		if (typeof apiPathSet !== "string") {
			apiPathSet = apiPath.search
		}

		const res = await $post(`${config.api}/${apiPathSet}`, getSearchForm())
		page.total = res.total ?? 0
		table.data = res.list ?? []
	}

	/**
	 * 查询不分页
	 */
	const useTableSearchListAll = async (apiPathSet = apiPath.searchAll) => {
		if (typeof apiPathSet !== "string") {
			apiPathSet = apiPath.searchAll
		}
		const res = await $post(`${config.api}/${apiPathSet}`, getSearchForm())
		table.data = res
	}

	const getSearchForm = () => {
		let sFilter = {}

		if (searchForm) {
			let searchFormKeys = { ...toRefs(searchForm) }
			Object.keys(searchFormKeys).forEach((key) => {
				sFilter[key] = unref(searchFormKeys[key])
			})
		}
		sFilter["current"] = page.current
		sFilter["size"] = page.size
		//console.log(sFilter)
		return sFilter
	}

	const useTableRemoveById = async (options = { id, path }, callbackSuccess = useTableSearch, callbackFail) => {
		let params
		//如果是对象
		if (isObject(options)) {
			params = { id: options?.id }
		} else {
			params = { id: options }
		}
		let apiPathValue = getApiPath(options?.path, apiPath.remove)
		const result = await $post(`${config.api}/${apiPathValue}`, params)
		removeCallBack(result, callbackSuccess, callbackFail)
	}

	/**
	 * 批量移除ids
	 * @param {*} options
	 * @param {*} callbackSuccess
	 * @param {*} callbackFail
	 */
	const useTableRemoveByIds = async (options = { ids: [], path: "" }, callbackSuccess = useTableSearch, callbackFail) => {
		//如果不是对象
		let params
		//如果是对象,ids为数组
		if (isObject(options)) {
			params = { id: options?.ids }
		} else {
			params = { id: options }
		}
		let apiPathValue = getApiPath(options?.path, apiPath.batchRemove)
		const result = await $post(`${config.api}/${apiPathValue}`, params)
		removeCallBack(result, callbackSuccess, callbackFail)
	}

	const removeCallBack = (result, callbackSuccess, callbackFail) => {
		if (result) {
			$success("删除成功")
			if (callbackSuccess) {
				callbackSuccess()
			}
		} else {
			$error(res.message ?? "删除失败")
			if (callbackFail) {
				callbackFail(result)
			}
		}
	}

	/**
	 * 下载
	 */
	const useTableDownload = async (apiPathSet = apiPath.download, apiExcelNameName = config.excelName) => {
		//兼容vue特殊注入函数语法
		if (typeof apiPathSet != "string") {
			apiPathSet = apiPath.download
		}
		if (typeof apiExcelNameName != "string") {
			apiExcelNameName = config.excelName
		}

		let queryParms = getSearchForm()
		await $$.download(`${config.api}/${apiPathSet}`, queryParms, `${apiExcelNameName}`)
	}

	const useTableGetFieldDownload = async (field = [], fieldData = []) => {
		let queryParms = getSearchForm()
		urlParms["field"] = field
		urlParms["fieldData"] = fieldData

		await $$.download(`${config.api}/${apiPath.download}`, queryParms, `${config.excelName}`)
	}

	/**
	 * 读取列表列字段
	 * @param {*} checkedField
	 */
	const useTablePostColumn = async (apiPathSet = apiPath.column) => {
		if (typeof apiPathSet != "string") {
			apiPathSet = apiPath.column
		}
		const res = await $post(`${config.api}/${apiPathSet}`)
		columns.value = res ?? []
	}

	const useTableGetColumn = async (apiPathSet = apiPath.column) => {
		const res = await $post(`${config.api}/${apiPathSet}`)
		return res
	}

	const useTablePostStat = async (apiPathSet = apiPath.stat) => {
		_searchFormSubmit(async () => {
			const res = await $post(`${config.api}/${apiPathSet}`, getSearchForm())
			table.data = res
			page.total = res.length
		})
	}

	//读取导出列表
	const useTableGetField = async () => {
		const res = await $get(`${config.api}/${apiPath.field}`)
		fields.value = res ?? []
	}

	const useTableGetFieldCheck = (checkedField) => {
		checkedField.value = []
		fields.value.map((item) => {
			checkedField.value.push(item.field)
		})
	}

	//自定义提交Post
	const useTablePost = async (path = "custom-post", params = {}) => {
		// const { path, params } = options
		// let apiPathValue = getApiPath(path, "custom-post")
		return await $post(`${config.api}/${path}`, params)
	}

	const useTableGet = async (path = "custom-get", params = {}) => {
		// const { path, params } = options
		// let apiPathValue = getApiPath(path, "get-form")
		return await $get(`${config.api}/${path}` + converToUrl(params))
	}

	/**
	 * 根据参数来获取接口路径
	 * @param {"*"} configPath
	 */
	const getApiPath = (configPath, defaultApiPath) => {
		if (typeof configPath == "string" && configPath != "") {
			return configPath
		}
		// if (configPath?.path && configPath.path != "") {
		// 	return configPath.path
		// }
		return defaultApiPath
	}

	return {
		table,
		page,
		rules,
		columns,
		fields,
		searchRef,
		searchForm,
		useTableSearchFormSubmit,
		useTableRemoveById,
		useTableRemove: useTableRemoveById,
		useTableRemoveByIds,
		useTableRemoveBatch: useTableRemoveByIds,
		useTableSearch,
		useTableSearchListAll,
		useTableDownload,
		useTableGetFieldDownload,
		useTableGetField,
		useTableGetFieldCheck,
		useTablePost,
		useTableGet,
		useTableSearchReset,
		useTableSearchResetLoad,
		useTableSearchSetValue,
		useTablePostColumn,
		useTableGetColumn,
		useTablePostStat
	}
}
