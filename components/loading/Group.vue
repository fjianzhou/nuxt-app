<template>
  <div class="">
    <template v-if="loading">
      <slot name="loading"> <LoadingSkeleton /></slot>
    </template>
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
    <template v-else-if="isEmpty">
      <Empty />
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>
<script setup>
import { NButton, NResult } from "naive-ui";
const loading = ref(false);
const props = defineProps(["pending", "error", "isEmpty"]);

const stop = watchEffect(() => {
  if (props.pending && !loading.value) {
    loading.value = true;
  } else {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
});

onUnmounted(() => {
  stop();
});
</script>
