import { dayjs, cloneDeep, getRandomIntBetween } from "./utils";
import GroupLine from "@iconify-icons/ri/group-line";
import Question from "@iconify-icons/ri/question-answer-line";
import CheckLine from "@iconify-icons/ri/chat-check-line";
import Smile from "@iconify-icons/ri/star-smile-line";

const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

/** 学生人数、作业提交数量、批改作业数量、学生满意度 */
const chartData = [
  {
    icon: GroupLine,
    bgColor: "#effaff",
    color: "#41b6ff",
    duration: 2200,
    name: "学生人数",
    value: 100, // 假设班级有100名学生
    percent: "+0%", // 学生人数通常固定
    data: [89, 92, 94, 96, 98, 100] // 单个数据点，用于圆形图
  },
  {
    icon: Question,
    bgColor: "#fff5f4",
    color: "#e85f33",
    duration: 1600,
    name: "作业提交数量",
    value: 150, // 假设累计150份作业提交
    percent: "+20%", // 本周相比上周增加20%
    data: [30, 40, 35, 45, 50, 55, 60] // 最近7天的提交数量，用于折线图
  },
  {
    icon: CheckLine,
    bgColor: "#eff8f4",
    color: "#26ce83",
    duration: 1500,
    name: "批改作业数量",
    value: 150, // 假设累计批改140份作业
    percent: "+15%", // 本周相比上周增加15%
    data: [25, 35, 30, 40, 45, 50, 55] // 最近7天的批改数量，用于折线图
  },
  {
    icon: Smile,
    bgColor: "#f6f4fe",
    color: "#7846e5",
    duration: 100,
    name: "学生满意度",
    value: 95, // 假设满意度为95%
    percent: "+5%", // 本周相比上周提高5%
    data: [93, 92, 94, 96, 98, 99] // 单个数据点，用于圆形图
  }
];

/** 作业提交与批改概览（柱状图数据） */
const barChartData = [
  {
    requireData: [30, 40, 35, 45, 50, 55, 60], // 上周每天作业提交数量
    questionData: [25, 35, 30, 40, 45, 50, 55] // 上周每天批改作业数量
  },
  {
    requireData: [35, 45, 40, 50, 55, 60, 65], // 本周每天作业提交数量
    questionData: [30, 40, 35, 45, 50, 55, 60] // 本周每天批改作业数量
  }
];

/** 每周作业提交率 */
const progressData = [
  {
    week: "周一",
    percentage: 85,
    duration: 110,
    color: "#41b6ff"
  },
  {
    week: "周二",
    percentage: 88,
    duration: 105,
    color: "#41b6ff"
  },
  {
    week: "周三",
    percentage: 90,
    duration: 100,
    color: "#41b6ff"
  },
  {
    week: "周四",
    percentage: 92,
    duration: 95,
    color: "#41b6ff"
  },
  {
    week: "周五",
    percentage: 95,
    duration: 90,
    color: "#26ce83"
  },
  {
    week: "周六",
    percentage: 97,
    duration: 85,
    color: "#26ce83"
  },
  {
    week: "周日",
    percentage: 100,
    duration: 80,
    color: "#26ce83"
  }
].reverse();

/** 数据统计（最近30天） */
const tableData = Array.from({ length: 30 }).map((_, index) => {
  return {
    id: index + 1,
    homeworkSubmitted: getRandomIntBetween(20, 50), // 每天作业提交数量
    homeworkGraded: getRandomIntBetween(15, 45), // 每天批改作业数量
    satisfaction: getRandomIntBetween(90, 100), // 每天学生满意度
    date: dayjs().subtract(index, "day").format("YYYY-MM-DD")
  };
});

/** 最新动态（最近14天） */
const latestNewsData = cloneDeep(tableData)
  .slice(0, 14)
  .map((item, index) => {
    return Object.assign(item, {
      date: `${dayjs().subtract(index, "day").format("YYYY-MM-DD")} ${
        days[dayjs().subtract(index, "day").day()]
      }`
    });
  });

export { chartData, barChartData, progressData, tableData, latestNewsData };
