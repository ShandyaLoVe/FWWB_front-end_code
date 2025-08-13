<script setup lang="ts">
import { Bing } from "./components";

defineOptions({
  name: "ChatAi"
});
</script>

<template>
  <div class="chat-container">
    <Bing />
  </div>
</template>

<style lang="scss" scoped>
.chat-container {
  height: 100%; /* 占满整个视口高度 */
  width: 100%; /* 占满整个视口宽度 */
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  // margin: 0;
  padding: 0; /* 移除默认内边距 */
  background-color: #f3f6fc; /* 统一背景颜色 */
  border: none; /* 取消边框 */
}
</style>
