export default [
  {
    path: "/job/result/list/:cmd/:jobId?",
    name: "JobResultList",
    component: "JobResultList",
    meta: {
      title: "任务结果列表",
      type: "menu",
      keepAlive: true,
      ifont: "",
      affix: false,
      closeTag: true,
    },
  },
]
