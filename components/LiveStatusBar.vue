<template>
  <n-alert :show-icon="false" :type="status === 'ing' ? 'success' : 'default'">
    <p class="text-ts text-gray-500">直播时间：{{ start }} ~ {{ end }}</p>
  </n-alert>
</template>
<script setup>
import { NAlert } from "naive-ui";
const props = defineProps(["start", "end"]);

const status = computed(() => {
  return useTimeStatus(props.start, props.end);
});
</script>
