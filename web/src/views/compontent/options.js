export const jobStatusOptions = [
  {
    value: 0,
    label: "启用",
  },
  {
    value: 1,
    label: "停用",
  },
]

export const jobCategoryOptions = [
  {
    value: "standalone",
    label: "单机",
  },
  {
    value: "broadcast",
    label: "广播",
  },
  {
    value: "map",
    label: "MAP",
  },
  // {
  //   value: "group",
  //   label: "group",
  // },
  // {
  //   value: "agent",
  //   label: "agent",
  // },
]
export const jobModelOptions = [
  {
    value: "plus",
    label: "轻量",
    desc: "无写库，无心跳",
  },
  {
    value: "max",
    label: "基础",
    desc: "有写库，无心跳",
  },
  {
    value: "pro",
    label: "专业",
    desc: "有写库，有心跳",
  },
  {
    value: "ultra",
    label: "客户端",
    desc: "有写库，有心跳",
  },
]

export const jobConditionOptions = [
  {
    value: "clientFirst",
    label: "注册优先",
  },
  {
    value: "clientRandom",
    label: "随机",
  },
  {
    value: "clientRound",
    label: "轮询",
  },
  {
    value: "clientMaxWeight",
    label: "最大权重",
  },
]

export const subjectModelOptions = [
  {
    value: "jetStream",
    label: "持久(JetStream)",
  },
  {
    value: "memory",
    label: "内存(Memory)",
  },
]
