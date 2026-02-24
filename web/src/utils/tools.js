import dayjs from "dayjs"

export const formatMs = (ms) => {
  if (ms == 0) {
    return "0"
  }
  const totalSeconds = ms / 1000
  //if (totalSeconds < 60) return `${Math.floor(totalSeconds)}s`;
  if (totalSeconds < 60) return `${totalSeconds.toFixed(3)}s`
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.floor(totalSeconds % 60)
  return `${minutes}m ${seconds}s`
}
/**
 * 将json转换为url拼接参数
 * @param {*} requestParams
 * @returns
 */
export const converToUrl = (requestParams, isJoin = "?") => {
  //{} 计算长度为0，直接返回空字符串
  if (requestParams == null || Object.keys(requestParams).length === 0) {
    return ""
  }

  let params = []
  Object.entries(requestParams).forEach(([key, value]) => {
    let param = key + "=" + value
    params.push(param)
  })
  return isJoin + params.join("&")
}
/**
 * 获取开始时间
 * @param {*} format
 * @returns
 */
export const startTime = (format = "YYYY-MM-DD 00:00:00") =>
  dayjs().format(format)

/**
 * 获取结束时间
 * @param {*} format
 * @returns
 */
export const endTime = (format = "YYYY-MM-DD 23:59:59") =>
  dayjs().format(format)

/**
 * 获取当前时间
 * @param {*} format
 * @returns
 */
export const nowTime = (format = "YYYY-MM-DD HH:mm:ss") =>
  dayjs().format(format)
/**
 * 获取当前时间
 * @param {*} format
 * @returns
 */
export const now = (format = "YYYY-MM-DD HH:mm:ss") => nowTime(format)

/**
 * 获取当前日期
 * @param {*} format
 * @returns
 */
export const nowDate = (format = "YYYY-MM-DD") => dayjs().format(format)

/**
 * 脱敏电话号码
 * @param {*} phone
 * @param {*} split
 */
export const privacyPhone = (phone, split = "****") =>
  (phone + "").replace(/(\d{3})\d{1,}(\d{4})/, `$1${split}$2`)

/**
 * 脱敏姓名
 * @param {*} name
 */
export const privacyName = (name, split = "**") =>
  name.replace(/^(\S)(\S|\s)*$/, `$1${split}`)

/**
 * 将秒转为时分秒
 * @param {*} time
 * @returns
 */
export const secToTime = (time) => {
  let h = Math.floor(time / 3600)
  let m = Math.floor((time % 3600) / 60)
  let s = Math.floor(time % 60)
  return (
    (h < 10 ? "0" + h : "00") +
    ":" +
    (m < 10 ? "0" + m : m) +
    ":" +
    (s < 10 ? "0" + s : s)
  )
}

/**
 * 计算时间差
 * @param {*} old_dateParm
 * @returns
 */
export const timeSpanSec = (old_dateParm) => {
  let new_date = new Date() //新建一个日期对象，默认现在的时间
  let old_date = new Date(old_dateParm)
  let difftime = (new_date - old_date) / 1000 //计算时间差,并把毫秒转换成秒
  return difftime
}

/**
 * 计算时间差秒
 * @param {*} new_dateParm
 * @param {*} old_dateParm
 * @returns
 */
export const timeSpanSecond = (new_dateParm, old_dateParm) => {
  let new_date = new Date(new_dateParm) //新建一个日期对象，默认现在的时间
  let old_date = new Date(old_dateParm)
  //let old_date = new Date("2021-08-30 00:00:00"); //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期
  let difftime = (new_date - old_date) / 1000 //计算时间差,并把毫秒转换成秒

  return difftime
}

/**
 * 跑马灯时间
 * @param {*} old_date
 * @returns
 */
export const timeSpan = (old_date) => {
  let new_date = new Date() //新建一个日期对象，默认现在的时间
  //let old_date = new Date("2021-08-30 00:00:00"); //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期
  let difftime = (new_date - old_date) / 1000 //计算时间差,并把毫秒转换成秒
  let hours = parseInt(difftime / 3600) // 小时 60*60 总小时数-过去的小时数=现在的小时数
  hours = hours < 10 ? "0" + hours : hours
  let minutes = parseInt((difftime % 3600) / 60) // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
  minutes = minutes < 10 ? "0" + minutes : minutes
  let seconds = parseInt(difftime % 60) // 以60秒为一整份 取余 剩下秒数
  seconds = seconds < 10 ? "0" + seconds : seconds

  return hours + ":" + minutes + ":" + seconds
}

/**
 * 分割路径
 * @param {*} path
 */
export const splitPath = (path = "") => {
  const match = path.match(
    /^([\s\S]*?)((?:\.{1,2}|[^\\/]+?|)(\.[^./\\]*|))(?:[\\/]*)$/,
  )
  return {
    dir: match[1],
    name: match[2],
    ext: match[3],
  }
}

/**
 * 深度冻结对象
 * @param {*} obj
 */
export const deepFreeze = (obj) => {
  let prop, propKey
  Object.freeze(obj)
  for (propKey in obj) {
    prop = obj[propKey]
    if (
      !obj.hasOwnProperty(propKey) ||
      !(typeof prop === "object") ||
      Object.isFrozen(prop)
    ) {
      continue
    }
    deepFreeze(prop)
  }
}

/**
 * 获取URL参数
 * @param {*} param
 * @param {*} url
 * @param {*} nullDefault
 */
export const urlParam = (
  param,
  nullDefault = null,
  url = window.location.href,
) => {
  let p = new URLSearchParams(new URL(url).search).get(param)
  return p || nullDefault
}

/**
 * 节流
 * 节流操作使回调函数在每隔一段时间定期执行一次，时间间隔内再触发，不会重新执行。
 * @param {*} func
 * @param {*} timerNumber
 */
export const throttle = (func, wait = 100) => {
  let timer = null
  return (...args) => {
    if (timer) {
      return
    }

    timer = setTimeout(() => {
      func(...args)
      timer = null
    }, wait)
  }
}

/**
 * 防抖
 * 短时间内多次触发一个函数,只执行最后一次,或在开始时执行
 * @param {*} fn
 * @param {*} delay
 */
export const debounce = (fn, delay = 200) => {
  let timer = null

  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

/**
 * 将数字进行分割
 * @param {*} num  数字
 * @param {*} cnt 要分割的数量
 * @param {*} split 分隔符,默认,
 */
export const formatNumber = (num, cnt = 3, split = ",") => {
  //let reg = /\B(?=(\d{3})+(?!\d))/g;
  let reg = new RegExp(`\\B(?=(\\d{${cnt}})+(?!\\d))`, "g")
  return num.toString().replace(reg, split)
}

/**
 * 将字符串进行分割
 * @param {*} val  string
 * @param {*} cnt 要分割的数量
 * @param {*} split 分隔符,默认,
 */
export const formatString = (val, cnt = 3, split = ",") => {
  let reg = new RegExp(`\\B(?=(\\w{${cnt}})+(?!\\w))`, "g")
  return val.replace(reg, split)
}

/**
 * 是否手机号码
 * @param {*} val
 */
export const isPhone = (val) => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(val)
// /^1[3456789]\d{9}$/.test(val);

/**
 * 是否邮箱
 * @param {*} val
 */
export const isEmail = (val) =>
  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val)

/**
 * 是否强密码，至少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
 * @param {*} val
 */
export const isPwdStrength = (val) =>
  /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(
    val,
  )

export const copyToClipboard = (str) => {
  if (str == undefined) {
    str = ""
  }
  const el = document.createElement("textarea")
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
  $success("复制成功")
}

export const setLocalStorageValue = (key, value) => {
  return localStorage.setItem(key, value)
}

export const getLocalStorageValue = (key) => {
  let data = localStorage.getItem(key)
  return data
}

export const setLocalStorage = (key, jsonValue) => {
  return localStorage.setItem(key, JSON.stringify(jsonValue))
}

export const getLocalStorage = (key) => {
  let data = localStorage.getItem(key)
  try {
    data = JSON.parse(data)
  } catch (err) {
    return null
  }
  return data
}

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
  localStorage.clear()
}
export const setSessionStorage = (key, jsonValue) => {
  return sessionStorage.setItem(key, JSON.stringify(jsonValue))
}

export const getSessionStorage = (key) => {
  let data = sessionStorage.getItem(key)
  try {
    data = JSON.parse(data)
  } catch (err) {
    return null
  }
  return data
}

export const removeSessionStorage = (key) => {
  return sessionStorage.removeItem(key)
}

export const clearSessionStorage = () => {
  sessionStorage.clear()
}

export const data = {
  set(table, settings) {
    let _set = JSON.stringify(settings)
    return localStorage.setItem(table, _set)
  },
  get(table) {
    let data = localStorage.getItem(table)
    try {
      data = JSON.parse(data)
    } catch (err) {
      return null
    }
    return data
  },
  remove(table) {
    return localStorage.removeItem(table)
  },
  clear() {
    return localStorage.clear()
  },
}

export const session = {
  set(table, settings) {
    let _set = JSON.stringify(settings)
    return sessionStorage.setItem(table, _set)
  },
  get(table) {
    let data = sessionStorage.getItem(table)
    try {
      data = JSON.parse(data)
    } catch (err) {
      return null
    }
    return data
  },
  remove(table) {
    return sessionStorage.removeItem(table)
  },
  clear() {
    return sessionStorage.clear()
  },
}

export const screen = (element) => {
  let isFull = !!(
    document.webkitIsFullScreen ||
    document.mozFullScreen ||
    document.msFullscreenElement ||
    document.fullscreenElement
  )
  if (isFull) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    }
  }
}

export const dateFormat = function (date, fmt = "yyyy-MM-dd hh:mm:ss") {
  date = new Date(date)
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length),
    )
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length),
      )
    }
  }
  return fmt
}

/* 千分符 */
export const groupSeparator = function (num) {
  num = num + ""
  if (!num.includes(".")) {
    num += "."
  }
  return num
    .replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
      return $1 + ","
    })
    .replace(/\.$/, "")
}

/**
 * 异步并发执行
 * @param {*} poolLimit
 * @param {*} array
 * @param {*} iteratorFn
 * @returns
 */
export const asyncPool = (poolLimit, array, iteratorFn) => {
  let i = 0
  const ret = [] // 存储所有的异步任务
  const executing = [] // 存储正在执行的异步任务
  const enqueue = function () {
    if (i === array.length) {
      return Promise.resolve()
    }
    const item = array[i++] // 获取新的任务项
    const p = Promise.resolve().then(() => iteratorFn(item, array))
    ret.push(p)

    let r = Promise.resolve()

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= poolLimit) {
        r = Promise.race(executing)
      }
    }

    // 正在执行任务列表 中较快的任务执行完成之后，才会从array数组中获取新的待办任务
    return r.then(() => enqueue())
  }
  return enqueue().then(() => Promise.all(ret))
}

/**
 * 获取当前时间+星期
 * @returns
 */
export const nowTimeDay = () => {
  var strRet = ""
  var myWeekDay = ""
  var d = new Date()
  var weekday = new Array(7)
  weekday[0] = "星期天"
  weekday[1] = "星期一"
  weekday[2] = "星期二"
  weekday[3] = "星期三"
  weekday[4] = "星期四"
  weekday[5] = "星期五"
  weekday[6] = "星期六"
  myWeekDay = weekday[d.getDay()]

  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var day = d.getDate()
  var hour = d.getHours()
  var minutes = d.getMinutes()
  var seconds = d.getSeconds()
  var strDate =
    year +
    "年" +
    (month < 10 ? "0" + month : month) +
    "月" +
    (day < 10 ? "0" + day : day) +
    "日"
  var strTime =
    (hour < 10 ? "0" + hour : hour) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds)
  strRet = strDate + "    " + myWeekDay + "    " + strTime

  return strRet
}

/**
 * 打开一个新的浏览器窗口
 * Open a new browser window
 *
 * @param {string} url - 要在新窗口中打开的 URL
 * The URL to open in the new window
 * @param {object} options - 打开窗口的选项
 * Options for opening the window
 * @param {string} options.target - 新窗口的名称或特殊选项，默认为 "_blank"
 * @param {string} options.features - 新窗口的特性（大小，位置等），默认为 "noopener=yes,noreferrer=yes"
 */
export const openWindow = (
  url,
  { target = "_blank", features = "noopener=yes,noreferrer=yes" },
) => {
  //  {
  // 	target = "_blank" | "_self" | "_parent" | "_top", // 新窗口的名称或特殊选项，默认为 "_blank"
  // 	features // 新窗口的特性（大小，位置等），默认为 "noopener=yes,noreferrer=yes"
  // }
  window.open(url, target, features)
}

/**
 * 打开一个新的浏览器窗口
 * @param {Sting} url
 * @param {Sting} title
 * @param {Number} w
 * @param {Number} h
 */
export const openWindowCustom = (url, title, w, h) => {
  // Fixes dual-screen position   Most browsers       Firefox
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : screen.left
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : screen.top

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height

  const left = width / 2 - w / 2 + dualScreenLeft
  const top = height / 2 - h / 2 + dualScreenTop
  const newWindow = window.open(
    url,
    title,
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=" +
      w +
      ", height=" +
      h +
      ", top=" +
      top +
      ", left=" +
      left,
  )

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
}

/**
 *  判断是否为对象
 * @param {*} value
 * @returns
 */
export const isObject = (value) => {
  return Object.prototype.toString.call(value) === "[object Object]"
}

export const isNullOrEmpty = (value) => {
  return value == null || value === "" || value === undefined
}

//拼接url,需要判断url1是否以/结尾 url2是否以/开头
export const joinUrl = (url1, url2) => {
  return (
    url1 +
    (url1.endsWith("/") ? "" : "/") +
    (url2.startsWith("/") ? url2.substring(1) : url2)
  )
}
