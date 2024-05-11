<template>
  <n-card class="coupon" :class="{ 'coupon-disabled': btnText != '立即使用' }">
    <h4>¥{{ data.price }}</h4>
    <p>适用{{ typeToText[data.type] }}:{{ data.title }}</p>
    <p>有效期：{{ data.start_time }} ~ {{ data.end_time }}</p>
    <template #footer>
      <div class="flex justify-end">
        <n-button
          :type="btnText != '立即使用' ? '' : 'warning'"
          :disabled="btnText != '立即使用'"
          @click="openOrder"
        >
          {{ btnText }}
        </n-button>
      </div>
    </template>
  </n-card>
</template>

<script setup>
import { NCard, NButton } from "naive-ui";
const props = defineProps(["data"]);

const btnText = computed(() => {
  const item = props.data;
  const expired = new Date(item.end_time).getTime() < new Date().getTime();
  return expired ? "已经过期" : "立即使用";
});

const typeToText = {
  course: "课程",
  column: "专栏",
};
const openOrder = () => {
  const { data } = props;
  navigateTo(`/creatrorder?id=${data.goods_id}&type=${data.type}`);
};
</script>

<style lang="scss">
.coupon {
  @apply bg-orange-500 border-0;
}
.coupon h4 {
  @apply text-2xl mb-2 font-bold text-white;
}
.coupon p {
  @apply text-sm text-light-300;
}
.coupon-disabled {
  @apply bg-gray-300;
}
</style>
