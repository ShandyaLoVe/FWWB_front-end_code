import { ppt } from "@/router/enums";
const IFrame = () => import("@/layout/frame.vue");

export default {
  path: "/ppt",
  redirect: "/ppt/index",
  meta: {
    icon: "ri:file-ppt-2-line",
    title: "课件生成",
    rank: ppt
  },
  children: [
    {
      path: "/ppt/index",
      name: "FramePpt",
      component: IFrame,
      meta: {
        title: "课件生成",
        keepAlive: true,
        frameSrc: "http://127.0.0.1:5173/",
        // frameSrc: "https://pipipi-pikachu.github.io/PPTist/",
        frameLoading: false
      }
    }
  ]
} satisfies RouteConfigsTable;
