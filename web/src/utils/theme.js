export const themeOverrides = reactive({
  common: {
    primaryColor: "",
    primaryColorHover: "",
  },
})

export const setTheme = (app_color) => {
  if (app_color) {
    document.documentElement.style.setProperty("--el-color-primary", app_color)
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--el-color-primary-light-${i}`,
        colorTool.lighten(app_color, i / 10),
      )
    }
    let colorValue = colorTool.darken(app_color, 0.1)
    document.documentElement.style.setProperty(
      `--el-color-primary-darken-1`,
      colorValue,
    )
    document.documentElement.style.setProperty(
      `--el-color-primary-darken-2`,
      colorValue,
    )
    document.documentElement.style.setProperty(
      `--el-color-primary-dark-2`,
      colorValue,
    )

    //native-ui
    let nativeColorValue = colorTool.lighten(app_color, 0.3)
    themeOverrides.common.primaryColor = app_color
    themeOverrides.common.primaryColorHover = nativeColorValue

    // document.documentElement.style.setProperty(`--colorIcon`, app_color)
  }

  localStorage.setItem("scrm-themeColor", app_color)
}

export const initTheme = () => {
  const app_color = localStorage.getItem("scrm-themeColor")
  if (app_color) {
    setTheme(app_color)
  }
}

export const colorTool = {
  HexToRgb(str) {
    str = str.replace("#", "")
    var hxs = str.match(/../g)
    for (var i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16)
    return hxs
  },

  RgbToHex(a, b, c) {
    var hexs = [a.toString(16), b.toString(16), c.toString(16)]
    for (var i = 0; i < 3; i++) {
      if (hexs[i].length == 1) hexs[i] = "0" + hexs[i]
    }
    return "#" + hexs.join("")
  },

  darken(color, level) {
    var rgbc = this.HexToRgb(color)
    for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level))
    return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
  },

  lighten(color, level) {
    var rgbc = this.HexToRgb(color)
    for (var i = 0; i < 3; i++)
      rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i])
    return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
  },
}

export const exitMaximize = () => {
  document.getElementById("app").classList.remove("main-maximize")

  document.documentElement.style.setProperty(
    "--main-height",
    "var(--main-height-min)",
  )
  document.documentElement.style.setProperty(
    "--main-card-height",
    "var(--main-card-height-min)",
  )
  document.documentElement.style.setProperty(
    "--main-tab-height",
    "var(--main-tab-height-min)",
  )
}

//退出最小化
export const exitMinimize = () => {
  document.getElementById("app").classList.add("main-maximize")

  document.documentElement.style.setProperty(
    "--main-height",
    "var(--main-height-max)",
  )
  document.documentElement.style.setProperty(
    "--main-card-height",
    "var(--main-card-height-max)",
  )
  document.documentElement.style.setProperty(
    "--main-tab-height",
    "var(--main-tab-height-max)",
  )
}
