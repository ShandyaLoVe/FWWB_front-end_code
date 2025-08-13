import { checkhw } from "@/router/enums";
// const IFrame = () => import("@/layout/frame.vue");

export default {
  path: "/checkHw",
  redirect: "/checkHw/index",
  meta: {
    icon: "ri:file-check-line",
    title: "作业批改",
    rank: checkhw
  },
  children: [
    {
      path: "/checkHw/index",
      name: "checkHw",
      component: () => import("@/views/hwJudge/index.vue"),
      meta: {
        title: "作业批改",
        keepAlive: true,
        frameLoading: false
      }
    }
  ]
} satisfies RouteConfigsTable;
