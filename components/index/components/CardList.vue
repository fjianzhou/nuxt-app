<template>
  <n-card
    class="cursor-pointer mb-5 shadow-md border-0 rounded"
    @click="openCourse(data.id, data.type)"
    content-class="!pb-10px"
    footer-class="!p-0px"
  >
    <template #cover>
      <UiImage :src="data.cover" class="w-100% h-150px" />
    </template>
    <div class="pt-2">
      <span class="font-bold w-full truncate font-semibold lh-20px">
        {{ data.title }}
      </span>
    </div>
    <div class="mt-2 flex items-end">
      <IndexComponentsPrice :value="data.price" />
      <IndexComponentsPrice :value="data.t_price" through class="m-l-8px" />
    </div>
    <template #footer v-if="data.group_id || data.flashsale_id">
      <div
        class="bg-yellow-500 text-white p-3 text-xs flex items-center rounded-b"
      >
        {{ data.ground_id ? "拼图中" : "秒杀中" }}
        <div class="ml-auto flex items-center">
          倒计时
          <IndexComponentsCountDown :time="data.end_time" />
        </div>
      </div>
    </template>
  </n-card>
</template>
<script setup>
import { NCard } from "naive-ui";
const props = defineProps(["data"]);
const openCourse = (id, type) => {
  let path = "";
  if (["course", "media", "audio", "video"].includes(type)) {
    path = `/detail/course/${id}`;
  } else if (type === "column") {
    path = `/detail/column/${id}`;
  } else if (type === "live") {
    path = `/detail/live/${id}`;
  }
  if (props.data.group_id) {
    path = `${path}?group_id=${props.data.group_id}`;
  }
  if (props.data.flashsale_id) {
    path = `${path}?flashsale_id=${props.data.flashsale_id}`;
  }
  navigateTo(path);
};
</script>
