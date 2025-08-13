<script setup lang="ts">
import { ref, nextTick } from "vue";
import Vditor from "./components/Vditor.vue";
import "plus-pro-components/es/components/form/style/css";
import {
  type PlusColumn,
  type FieldValues,
  PlusForm
} from "plus-pro-components";
import { Loading } from "@element-plus/icons-vue";
import axios from "axios"; // 导入 axios 用于发送 HTTP 请求

const isLoading = ref(false); // 添加加载状态
const promptState = ref<FieldValues>({
  prompt: ""
});

const text = ref(`
# 教案将于此处生成
`);

const rules = {
  prompt: [
    {
      required: true,
      message: "请输入提示词",
      trigger: "blur" // 在输入框失去焦点时触发校验
    }
  ]
};

const columns: PlusColumn[] = [
  {
    label: "提示词",
    prop: "prompt",
    valueType: "textarea",
    fieldProps: {
      placeholder: "请输入你的提示词",
      autosize: { minRows: 3, maxRows: 6 },
      maxlength: 200,
      showWordLimit: true
    }
  }
];

const handleSubmitError = (err: any) => {
  console.log("提交失败:", err);
};

const handleSubmit = async (values: FieldValues) => {
  isLoading.value = true; // 开始加载
  // 提交时立即显示“生成中”提示
  text.value = `
# 教案生成中
请耐心等待...
  `;

  try {
    // 发送 POST 请求到后端
    const response = await axios.post(
      "http://127.0.0.1:8081/api/llm/generate/lesson_plan",
      {
        input_text: values.prompt
      }
    );

    // 假设后端返回的数据中教案内容在 response.data.result 中
    const lessonPlan = response.data.result || response.data;

    // 更新 Markdown 编辑器内容为实际教案
    text.value = lessonPlan;

    // 清空输入框
    promptState.value.prompt = "";
    await nextTick();
  } catch (error) {
    console.error("请求失败:", error);
    text.value = `
# 请求失败
请检查网络连接或稍后再试
    `;
  } finally {
    isLoading.value = false; // 结束加载
  }
};

const handleReset = () => {
  promptState.value.prompt = "";
};

defineOptions({
  name: "Markdown"
});
</script>

<template>
  <el-card shadow="never" class="w-full max-w-5xl mx-auto">
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-2">输入教案要求</h2>
      <PlusForm
        v-model="promptState"
        :disabled="isLoading"
        class="w-full"
        :columns="columns"
        :rules="rules"
        label-position="top"
        has-footer
        submit-text="提交"
        reset-text="重置"
        @submit="handleSubmit"
        @submit-error="handleSubmitError"
        @reset="handleReset"
      />
    </div>

    <div>
      <h2 class="text-lg font-semibold mb-2">教案生成展示</h2>
      <Vditor
        id="formElement-type"
        v-model="text"
        :options="{
          height: 560,
          outline: { enable: true, position: 'right' }
        }"
      />
      <div
        v-if="isLoading"
        class="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50"
      >
        <el-icon class="animate-spin text-2xl mr-2"><Loading /></el-icon>
        <span class="text-lg font-semibold">生成中，请等待...</span>
      </div>
    </div>
     <div class="flex justify-end mt-4">
      <el-button
        type="primary"
        :loading="isLoading"
        class="mt-4 w-full md:w-auto"
      >
        点击下载
      </el-button>
    </div>
  </el-card>
</template>

<style scoped>
.max-w-4xl {
  max-width: 64rem;
}
.mx-auto {
  margin-right: auto !important;
  margin-left: auto !important;
}
.mb-6 {
  margin-bottom: 1.5rem;
}

.loading-overlay {
  transition: opacity 0.3s ease-in-out;
}
</style>
