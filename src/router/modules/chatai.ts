import { chatai } from "@/router/enums";

export default {
  path: "/chatai",
  redirect: "/chatai/index",
  meta: {
    icon: "ri:ai-generate-2",
    title: "AI助教",
    rank: chatai
  },
  children: [
    {
      path: "/chatai/index",
      name: "ChatAi",
      component: () => import("@/views/chatai/index.vue"),
      meta: {
        title: "AI助教",
        // extraIcon: "IF-pure-iconfont-new svg"
        frameLoading: false
      }
    }
  ]
} satisfies RouteConfigsTable;
