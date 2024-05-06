<template>
  <div class="flex justify-center items-center h-screen">
    <n-result status="500" title="错误提示" :description="error.message">
      <template #footer>
        <n-button @click="handleError">返回首页</n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup>
import { NResult, NButton } from "naive-ui";
const props = defineProps(["error"]);

const handleError = () => clearError({ redirect: "/" });
</script>
