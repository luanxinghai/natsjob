export default [
  {
    path: "/job/list/:cmd/:namespaceId/:appId?",
    name: "JobList",
    component: "JobList",
    meta: {
      title: "任务列表",
      type: "menu",
      keepAlive: true,
      ifont: "",
      affix: false,
      closeTag: true,
    },
  },
]
