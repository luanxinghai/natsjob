export default (error, vm) => {
  if (error.status) {
    return false
  }

  var errorMap = {
    InternalError: "Javascript引擎内部错误",
    ReferenceError: "未找到对象",
    TypeError: "使用了错误的类型或对象",
    RangeError: "使用内置对象时，参数超范围",
    SyntaxError: "语法错误",
    EvalError: "错误的使用了Eval",
    URIError: "URI错误",
  }
  var errorName = errorMap[error.name] || "未知错误"

  console.warn(`[scrm error]: ${error}`)
  console.error(error)
  //throw error;

  vm.$nextTick(() => {
    vm.$notify.error({
      title: errorName,
      message: error,
    })
  })
}
