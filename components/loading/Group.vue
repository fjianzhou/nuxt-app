<template>
  <div class="">
    <template v-if="pending"> 加载中222。。。。 </template>
    <template v-else-if="error">
      <n-result
        status="500"
        title="错误提示"
        :description="error?.data?.data || '页面走丢了'"
      >
        <template #footer>
          <n-button @click="$router.go(-1)">返回上一页</n-button>
        </template>
      </n-result></template
    >
    <template v-else>
      <slot />
    </template>
  </div>
</template>
<script setup>
import { NButton, NResult } from "naive-ui";
defineProps(["pending", "error"]);
</script>
