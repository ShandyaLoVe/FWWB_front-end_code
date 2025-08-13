<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { message } from "@/utils/message";
import type { UploadFile } from "element-plus";
import { Loading, Delete, Plus } from "@element-plus/icons-vue";
import Vditor from "./components/Vditor.vue";

defineOptions({
  name: "HomeworkUpload"
});

const fileList = ref<UploadFile[]>([]);
const isLoading = ref(false);
const correctionResult = ref("");

// 后端 API 地址
const API_URL = "http://127.0.0.1:8000/api/correct-homework";

// 上传文件前的校验
const onBefore = (file: File) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    message("只能上传 JPEG、PNG 或 GIF 图片");
    return false;
  }
  const isExceed = file.size / 1024 / 1024 > 2;
  if (isExceed) {
    message("单个图片大小不能超过 2MB");
    return false;
  }
  return true;
};

// 提交文件进行批改
const handleSubmit = async () => {
  if (fileList.value.length === 0) {
    message("请先上传图片");
    return;
  }

  isLoading.value = true;
  correctionResult.value = "# 批改中\n请稍候...";

  try {
    const formData = new FormData();
    fileList.value.forEach(file => {
      formData.append("files", file.raw);
    });

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    correctionResult.value = response.data.result;
  } catch (error) {
    console.error("批改失败:", error);
    correctionResult.value = "# 批改失败\n请稍后再试";
  } finally {
    isLoading.value = false;
  }
};

// 移除上传的文件
const handleRemove = (file: UploadFile) => {
  fileList.value = fileList.value.filter(f => f.uid !== file.uid);
};
</script>

<template>
  <el-card shadow="hover" class="max-w-5xl mx-auto rounded-lg">
    <template #header>
      <div class="card-header">
        <h2 class="text-xl font-semibold text-gray-800">上传作业图片</h2>
      </div>
    </template>

    <div class="mb-6">
      <el-upload
        v-model:file-list="fileList"
        multiple
        :before-upload="onBefore"
        :auto-upload="false"
        list-type="picture-card"
        accept="image/jpeg,image/png,image/gif"
        class="upload-container"
      >
        <template #default>
          <el-icon class="text-3xl text-gray-500"><Plus /></el-icon>
        </template>
        <template #file="{ file }">
          <img :src="file.url" alt="预览" class="object-cover" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <el-icon class="text-red-500 hover:text-red-700"
                ><Delete
              /></el-icon>
            </span>
          </span>
        </template>
      </el-upload>
      <el-button
        type="primary"
        :loading="isLoading"
        class="mt-4 w-full md:w-auto"
      >
        批量上传
      </el-button>

      <el-button
        type="primary"
        :loading="isLoading"
        class="mt-4 w-full md:w-auto"
        @click="handleSubmit"
      >
        提交批改
      </el-button>
    </div>

    <div v-if="correctionResult" class="relative">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">批改结果</h3>
      <Vditor
        id="correction-vditor"
        v-model="correctionResult"
        :options="{
          height: 400,
          minHeight: 300,
          outline: { enable: true, position: 'right' },
          mode: 'ir', // 即时渲染模式
          theme: 'light'
        }"
      />
      <div
        v-if="isLoading"
        class="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-lg"
      >
        <el-icon class="animate-spin text-2xl text-blue-500 mr-2"
          ><Loading
        /></el-icon>
        <span class="text-lg font-semibold text-gray-700"
          >生成中，请等待...</span
        >
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.max-w-5xl {
  max-width: 80rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.upload-container :deep(.el-upload-list__item) {
  border-radius: 0.375rem;
  overflow: hidden;
  transition: all 0.3s ease;
}
.upload-container :deep(.el-upload-list__item:hover) {
  transform: scale(1.02);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.upload-container :deep(.el-upload-list__item img) {
  width: 100%;
  height: 100%;
}
.el-button--primary {
  background-color: #409eff;
  border-color: #409eff;
  transition: all 0.3s ease;
}
.el-button--primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}
</style>
