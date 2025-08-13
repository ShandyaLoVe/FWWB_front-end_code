import { homework } from "@/router/enums";

export default {
  path: "/hwGen",
  redirect: "/hwGen/index",
  meta: {
    icon: "ri:ai-generate-text",
    title: "作业生成",
    rank: homework
  },
  children: [
    {
      path: "/hwGen/index",
      name: "hwGen",
      component: () => import("@/views/hwGeneration/index.vue"),
      meta: {
        title: "作业生成",
        keepAlive: true,
        frameLoading: false
      }
    }
  ]
} satisfies RouteConfigsTable;
