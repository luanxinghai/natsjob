import * as tool from "@/utils/tools"
import { useRouter } from "vue-router"

const PARAM = {
  TOKEN: "token",
}

export const setLogin = (data) => {
  sessionStorage.setItem(PARAM.TOKEN, data.token)
}

export const refreshLogin = (data) => {}

export const setLogout = (isLogoutCode = false) => {
  logoutSystem()
}

const logoutSystem = () => {
  setLogoutClearCache()
  setTimeout(() => {
    window.location.href = window.location.origin
  }, 1000)
}

export const setLogoutClearCache = () => {
  tool.removeSessionStorage(PARAM.TOKEN)
  try {
    const router = useRouter()
    router.replace({ path: "/natsjob/login" })
  } catch (e) {
    console.error(e)
  }
}
