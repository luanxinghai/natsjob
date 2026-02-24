import validator from "validator"
const rules = {
  Passwd(str) {
    const regex = /^[0-9a-zA-Z_!@#$%^&*()+={}:./-|"';?><\\]+$/
    return valid(str, regex, "密码是数字,英文和特殊字符组合")
  },
  UserId(str) {
    const regex = /^[0-9a-zA-Z-_]+$/
    return valid(str, regex, "账号是数字,英文,-_的组合")
  },
  Ext(str) {
    const regex = /^[1-9]\d*$/
    return valid(str, regex, "分机必须是数字")
  },
  En(str) {
    const regex = /^[a-zA-Z:_-]+$/
    return valid(str, regex, "字段只能是英文以及特殊字符冒号,下划线,横线")
  },
  Limits(str) {
    const regex = /^[a-zA-Z0-9:.-_*]+$/
    return valid(str, regex, "必须是英文,数字,冒号,点,横线,*字符")
  },
  Url(url) {
    const regex =
      /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?"\\+&%$#=~_-]+))*$/
    return valid(url, regex, "URL格式不正确")
  },
  Http(str) {
    const regex = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
    return valid(str, regex, "http(s)地址不合法")
  },

  LowerCase(str) {
    const regex = /^[a-z]+$/
    return valid(str, regex, "只能输入小写字母")
  },

  UpperCase(str) {
    const regex = /^[A-Z]+$/
    return valid(str, regex, "只能输入大写字母")
  },

  Alphabets(str) {
    const regex = /^[A-Za-z]+$/
    return valid(str, regex, "只能输入字母")
  },

  Email(email) {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return valid(email, regex, "邮箱地址格式不正确")
  },

  Postcode(postcode) {
    const regex = /^[0-9][0-9]{5}$/
    return valid(postcode, regex, "邮编格式不正确")
  },

  Number(num) {
    const regex = /^\d+$/
    return valid(num, regex, "只能输入纯数字")
  },

  Fax(fax) {
    const regex = /^(\d{3,4}-)?\d{7,8}$/
    return valid(fax, regex, "传真格式不正确")
  },

  Int(num) {
    const regex = /^((0)|([1-9]\d*))$/
    return valid(num, regex, "只能输入非负整数")
  },

  IntPlus(num) {
    const regex = /^[1-9]\d*$/
    return valid(num, regex, "只能输入正整数")
  },

  Float1(num) {
    const regex = /^-?\d+(\.\d)?$/
    return valid(num, regex, "只能输入数字，最多一位小数")
  },

  Float2(num) {
    const regex = /^-?\d+(\.\d{1,2})?$/
    return valid(num, regex, "只能输入数字，最多两位小数")
  },

  Float3(num) {
    const regex = /^-?\d+(\.\d{1,3})?$/
    return valid(num, regex, "只能输入数字，最多三位小数")
  },

  FloatPlus3(num) {
    const regex = /^\d+(\.\d{1,3})?$/
    return valid(num, regex, "只能输入数字，最多三位小数")
  },

  Encode(code) {
    const regex = /^(_|-|[a-zA-Z0-9])+$/
    return valid(code, regex, "编码只能使用字母、数字、下划线、中划线")
  },

  Encode2(code) {
    const regex = /^[a-zA-Z0-9]+$/
    return valid(code, regex, "编码只能使用字母、数字")
  },

  Encode3(code) {
    const regex = /^(_|[a-zA-Z0-9])+$/
    return valid(code, regex, "编码只能使用字母、数字、下划线")
  },

  IdCard(code) {
    const regex =
      /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    return valid(code, regex, "请输入正确的身份证号码")
  },

  Uscc(code) {
    const regex = /^[0-9A-Z]{18}/
    return valid(code, regex, "请输入正确的社会信用号")
  },

  CarNum(code) {
    const regex =
      /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/i
    return valid(code, regex, "请输入正确的车牌号")
  },

  CNandEN(code) {
    const regex = /^[a-zA-Z\u4e00-\u9fa5]+$/
    return valid(code, regex, "只能使用中文、英文")
  },
  Editor(code) {
    const text = "<p><br></p>"
    return validText(code, text, "该字段为必填项")
  },
  Tel(code) {
    const regex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    return valid(code, regex, "只能使用数字的手机号码")
  },
  IPV4(code) {
    const regex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    return valid(code, regex, "ip v4格式不正确")
  },
  IPV6(code) {
    const regex =
      /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/
    return valid(code, regex, "ip v4格式不正确")
  },
}

//标准的模式使用
const rulesStd = {
  date: {
    type: "date",
    required: true,
    message: "请选择时间",
    trigger: "change",
  },
}

function valid(val, regex, msg) {
  return {
    result: regex instanceof RegExp ? regex.test(val) : !!val,
    errMsg: msg,
  }
}

function validText(val, text, msg) {
  return {
    result: val != text,
    errMsg: msg,
  }
}

export function useRule(
  required = true,
  type,
  trigger = "blur",
  nullMsg = "该字段为必填项",
) {
  let myRules = rulesStd[type]
  if (myRules) {
    const ruleSet = { type, required: !!required, trigger, message: nullMsg }

    return ruleSet
  }

  const rule = { required: !!required, trigger }

  let check = null
  if (typeof type === "function") {
    check = type
  } else {
    check = type ? rules[type + ""] : null
  }

  if (check) {
    rule.validator = (r, v, c) => {
      const { result, errMsg } = check(v)
      if (required) {
        return v == null || (v + "").trim() === ""
          ? c(new Error(nullMsg))
          : result
            ? c()
            : c(new Error(errMsg))
      }
      return v == null || v + "" === "" || result ? c() : c(new Error(errMsg))
    }
  } else {
    rule.message = nullMsg
  }

  return [rule]
}

export function useRuleChange(
  required = true,
  type,
  trigger = "change",
  nullMsg = "该字段为必填项",
) {
  return useRule(required, type, trigger, nullMsg)
}
