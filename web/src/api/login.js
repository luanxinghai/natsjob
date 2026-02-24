import { post } from "@/utils/fetch"
import CryptoJS from "crypto-js"

export const useApiLogin = () => {
  const login = async (form) => {
    return await post("/natsjob/api/login", form)
  }
  return {
    login,
  }
}

export const useAesPasswd = () => {
  const key = CryptoJS.enc.Utf8.parse("ANM408B24462AZYR")
  const iv = CryptoJS.enc.Utf8.parse("LYTNRU5666k4NWDD")

  const encrypted = (plaintext) => {
    return CryptoJS.AES.encrypt(plaintext, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString()
  }

  const decrypted = (encryptedStr) => {
    return CryptoJS.AES.decrypt(encryptedStr, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8)
  }

  return {
    encrypted,
    decrypted,
  }
}
