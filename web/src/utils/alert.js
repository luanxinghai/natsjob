import { ElMessage, ElNotification } from "element-plus"

export const $success = (msg) => {
	ElMessage({
		message: msg,
		type: "success",
		plain: true,
		showClose: true
	})
}

export const $error = (msg) => {
	ElMessage({
		message: msg,
		type: "error",
		plain: true,
		showClose: true
	})
}

export const $se = (isSuccess = false, successMsg = "执行成功", errorMsg = "执行失败,请重试") => {
	isSuccess ? $success(successMsg) : $error(errorMsg)
}

export const $warning = (msg, params) => {
	ElMessage({
		message: msg,
		type: "warning",
		plain: true,
		showClose: true,
		// offset: 50,
		...params
	})
}

export const $info = (msg) => {
	ElMessage({
		message: msg,
		type: "info",
		plain: true,
		showClose: true
	})
}

export const $nsuccess = (msg, title = "") => {
	ElNotification({
		title: title,
		message: msg,
		type: "success",
		plain: true
	})
}

export const $nerror = (msg, title = "") => {
	ElNotification({
		title: title,
		message: msg,
		type: "error",
		plain: true
	})
}

export const $nwarning = (msg, title = "") => {
	ElNotification({
		title: title,
		message: msg,
		type: "warning",
		plain: true
	})
}

export const $ninfo = (msg, title = "") => {
	ElNotification({
		title: title,
		message: msg,
		type: "info",
		plain: true
	})
}
