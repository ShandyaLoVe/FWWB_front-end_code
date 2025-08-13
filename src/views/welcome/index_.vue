<script setup lang="ts">
// import { getToken } from "@/utils/auth";
import { useUserStoreHook } from "@/store/modules/user";
import { computed } from "vue";
defineOptions({
  name: "Welcome"
});

const userStore = useUserStoreHook();
const teacherName = computed(() => userStore.nickname || "未知");
</script>

<template>
  <div>
    <!-- 展示用户名和昵称 -->
    <h1>{{ teacherName }}老师，您好！</h1>
  </div>
</template>
