<script setup lang="ts">
import { ref } from "vue";
import "plus-pro-components/es/components/form/style/css";
import {
  type PlusColumn,
  type FieldValues,
  PlusForm
} from "plus-pro-components";

// 定义表单状态
const promptState = ref<FieldValues>({
  prompt: ""
});

// 定义表单校验规则
const rules = {
  prompt: [
    {
      required: true,
      message: "请输入 Prompt"
    }
  ]
};

// 定义表单列配置
const columns: PlusColumn[] = [
  {
    label: "Prompt",
    prop: "prompt",
    valueType: "textarea",
    fieldProps: {
      placeholder: "请输入你的 Prompt",
      autosize: { minRows: 3, maxRows: 6 },
      maxlength: 200,
      showWordLimit: true
    }
  }
];

// 处理提交事件
const handleSubmit = (values: FieldValues) => {
  console.log("提交的 Prompt:", values.prompt);
};

// 处理提交失败事件
const handleSubmitError = (err: any) => {
  console.log("提交失败:", err);
};

// 处理重置事件
const handleReset = () => {
  console.log("表单已重置");
  promptState.value.prompt = "";
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <PlusForm
      v-model="promptState"
      class="w-[400px]"
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
</template>

<style scoped>
.min-h-screen {
  background-color: #f5f5f5;
}
</style>
