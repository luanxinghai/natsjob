import * as tools from "@/utils/tools"
import * as alert from "@/utils/alert"
import errorHandler from "./utils/errorHandler"
import axiosFetch from "@/utils/fetch.js"
import axios from "axios"
import dayjs from "dayjs"
import { useRule } from "@/hooks/validator"
import { useTable } from "@/hooks/table"
import { useForm, useFormClone } from "@/hooks/form"
import * as elIcons from "@element-plus/icons-vue"
export default {
  install(app) {
    let func = {
      $config: {},
      $tools: tools,
      $axios: axios,
      $$: axiosFetch,
      $: axiosFetch,
      $get: axiosFetch.get,
      $post: axiosFetch.post,
      $$get: axiosFetch.get,
      $$post: axiosFetch.post,
      useGet: axiosFetch.get,
      usePost: axiosFetch.post,
      useAuthorization: axiosFetch.useAuthorization,
      $success: alert.$success,
      $error: alert.$error,
      $se: alert.$se,
      $warning: alert.$warning,
      $info: alert.$info,
      $nsuccess: alert.$nsuccess,
      $nerror: alert.$nerror,
      $nwarning: alert.$nwarning,
      $ninfo: alert.$ninfo,
      $dayjs: dayjs,
      useRule: useRule,
      useTable: useTable,
      useForm: useForm,
      useFormClone: useFormClone,
    }
    Object.keys(func).map((item) => {
      window[item] = func[item]
      app.config.globalProperties[item] = func[item]
      if (!item.startsWith("$")) {
        window["$" + item] = func[item]
        app.config.globalProperties["$" + item] = func[item]
      }
    })
    app.config.errorHandler = errorHandler
    for (let icon in elIcons) {
      app.component(`${icon}`, elIcons[icon])
    }
  },
}
