// 最简代码，也就是这些字段必须有
export default {
  path: "/fighting",
  redirect: "/fighting/index",
  meta: {
    title: "加油",
    icon: "ep:home-filled",
    showLink: false
  },
  children: [
    {
      path: "/fighting/index",
      name: "Fighting",
      component: () => import("@/views/fighting/index.vue"),
      meta: {
        title: "加油",
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable;
