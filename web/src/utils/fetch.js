import axios from "axios"
import { ElNotification } from "element-plus"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { converToUrl } from "@/utils/tools"

import { setLogout, setLogoutClearCache } from "@/app/app"

const errorNotify = (error) => {
  ElNotification({
    title: "请求失败",
    message: error,
    type: "error",
  })
}

const httpService = axios.create({
  timeout: 60000,
})

const errorHandler = (error) => {
  NProgress.done()
  console.error(error)
  let isLogoutCode = false
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = "错误请求"
        break
      case 401:
        isLogoutCode = true
        error.message = "未授权，请重新登录"
        break
      case 403:
        error.message = "拒绝访问"
        break
      case 404:
        error.message = "请求错误,未找到该资源"
        break
      case 405:
        error.message = "请求方法未允许"
        break
      case 408:
        error.message = "请求超时"
        break
      case 500:
        error.message = "服务器端出错"
        break
      case 501:
        error.message = "网络未实现"
        break
      case 502:
        error.message = "网络错误"
        break
      case 503:
        error.message = "服务不可用"
        break
      case 504:
        error.message = "网络超时"
        break
      case 505:
        error.message = "http版本不支持该请求"
        break
      default:
        error.message = `未知错误${error.response.status}`
    }
  } else {
    error.message = "连接到服务器失败"
  }

  let errorMessage = error.message
  if (error && error.request.response) {
    if (error.request.responseType === "blob") {
      let reader = new FileReader()
      reader.readAsText(error.request.response)

      reader.onload = function () {
        let errorMsg = reader.result
        errorMessage = parseErrorMessage(error, errorMsg)
        errorNotify(errorMessage)
      }
    } else {
      let errorMsg = error.request.response
      errorMessage = parseErrorMessage(error, errorMsg)
      errorNotify(errorMessage)
    }
  }

  if (isLogoutCode) {
    setLogout(isLogoutCode)
  }
  return Promise.reject(error)
}

const parseErrorMessage = (error, errorMsg) => {
  try {
    let data = JSON.parse(errorMsg)
    let errorMessage = data?.message || data?.error
    if (errorMessage) {
      error.message = errorMessage
    }
    return errorMessage
  } catch (e) {
    console.error("异常解析数据", errorMsg)
  }
  return null
}

httpService.interceptors.request.use((config) => {
  if (config.isNProgress) {
    NProgress.start()
  }
  let token = sessionStorage.getItem("token")
  if (token) {
    config.headers["Authorization"] = "Bearer " + token
  }
  return config
}, errorHandler)

httpService.interceptors.response.use((response) => {
  if (response.config.isNProgress) {
    NProgress.done()
  }
  return response
}, errorHandler)

export function get(url, params = {}, isNProgress = true) {
  url = useUrl(url)
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: "get",
      params: params,
      isNProgress: isNProgress,
    })
      .then((response) => {
        responseCode(resolve, reject, response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function post(url, params = {}, isNProgress = true) {
  url = useUrl(url)
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: "post",
      data: params,
      isNProgress: isNProgress,
    })
      .then((response) => {
        responseCode(resolve, reject, response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const responseCode = (resolve, reject, data) => {
  if (data.code == 0) {
    resolve(data.data)
    return
  }
  console.error("error", data)
  errorNotify(data.message ?? "请求异常")
}

export function downloadGet(
  url,
  fileName = "数据详情.xlsx",
  isNProgress = true,
) {
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: "get",
      data: {},
      responseType: "blob",
      fileName: fileName,
      isNProgress: isNProgress,
    })
      .then((responseData) => {
        let response = responseData.data
        var blob = new Blob([response])
        var downloadElement = document.createElement("a")
        var href = window.URL.createObjectURL(blob)
        downloadElement.href = href
        downloadElement.download = responseData.config.fileName
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
        window.URL.revokeObjectURL(href)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function download(
  url,
  params = {},
  fileName = "数据详情.xlsx",
  isNProgress = true,
) {
  url = useUrl(url)
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: "post",
      data: params,
      responseType: "blob",
      fileName: fileName,
      isNProgress: isNProgress,
    })
      .then((responseData) => {
        let response = responseData.data
        var blob = new Blob([response])
        var downloadElement = document.createElement("a")
        var href = window.URL.createObjectURL(blob)
        downloadElement.href = href
        downloadElement.download = responseData.config.fileName
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
        window.URL.revokeObjectURL(href)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function downloadUrl(
  url,
  params = {},
  fileName = "",
  isNProgress = true,
) {
  url = useUrl(url)
  let p = converToUrl(params)
  download(url + p, {}, fileName, isNProgress)
}

export function upload(url, params = {}, isNProgress = true) {
  url = useUrl(url)
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: "post",
      data: params,
      headers: { "Content-Type": "multipart/form-data" },
      isNProgress: isNProgress,
    })
      .then((response) => {
        //resolve(response)
        responseCode(resolve, reject, response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * ajax同步请求
 * @param {*} url
 * @param {*} method
 * @returns
 */
const ajax = (url, method = "GET", body) => {
  url = useUrl(url)
  let content = null
  var xhr = new XMLHttpRequest()
  xhr.open(method, url, false) //false代表同步请求
  xhr.setRequestHeader("Authorization", useAuthorization())
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8")

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // console.log(xhr.responseText) // 从服务器获取数据
      try {
        content = JSON.parse(xhr.responseText)
      } catch (error) {
        content = xhr.responseText
      }
    }
  }
  if (body) {
    xhr.send(body)
  } else {
    xhr.send()
  }
  return content
}

const useAuthorization = () => {
  return "Bearer " + sessionStorage.getItem("token")
}

const useUrl = (url) => {
  return url.startsWith("/") ? url : `/${url}`
}

const axiosHttp = {
  get,
  post,
  download,
  downloadGet,
  downloadUrl,
  upload,
  ajax,
  useAuthorization,
}
window.$$ = axiosHttp
export default axiosHttp
