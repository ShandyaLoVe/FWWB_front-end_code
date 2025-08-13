import { plan } from "@/router/enums";

export default {
  path: "/lessonPlan",
  redirect: "/lessonPlan/index",
  meta: {
    icon: "ri:book-shelf-line",
    title: "教案生成",
    rank: plan
  },
  children: [
    {
      path: "/lessonPlan/index",
      name: "lessonPlan",
      component: () => import("@/views/lessonPlan/index.vue"),
      meta: {
        title: "教案生成",
        keepAlive: true,
        frameLoading: false
      }
    }
  ]
} satisfies RouteConfigsTable;
