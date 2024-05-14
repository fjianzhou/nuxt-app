<template>
  <n-card class="coupon" :class="{ 'coupon-disabled': isgetcoupon }">
    <h4>¥{{ data.price }}</h4>
    <p>适用{{ typeToText[data.type] }}:{{ data.value.title }}</p>
    <p>
      有效期：<n-time :time="new Date(data.start_time)" />
      ~
      <n-time :time="new Date(data.end_time)" />
    </p>
    <template #footer>
      <div class="flex justify-end">
        <n-button
          size="small"
          :type="isgetcoupon ? '' : 'warning'"
          :disabled="isgetcoupon"
          :loading="loading"
          @click="openOrder"
        >
          {{ isgetcoupon ? "已领取" : "立即领取 " }}
        </n-button>
      </div>
    </template>
  </n-card>
</template>

<script setup>
import { NCard, NButton, NTime, createDiscreteApi } from "naive-ui";
const props = defineProps(["data"]);
const loading = ref(false);

const isgetcoupon = ref(props.data.isgetcoupon);
const typeToText = {
  course: "课程",
  column: "专栏",
};
const openOrder = () => {
  const { message } = createDiscreteApi(["message"]);

  if (isgetcoupon.value) {
    message.error("已经领取过了");
    return;
  }
  useHasAuth(async () => {
    loading.value = true;
    const { error } = await userCouponReceiveApi({ coupon_id: props.data.id });
    if (error.value) return;
    message.success("领取成功");
    loading.value = false;
    isgetcoupon.value = true;
  });
};
</script>

<style lang="scss">
.coupon {
  @apply mb-5 \!bg-orange-500 border-0;
}
.coupon h4 {
  @apply text-2xl mb-2 font-bold text-white;
}
.coupon p {
  @apply text-sm text-light-300;
}
.coupon-disabled {
  @apply \!bg-gray-300;
}
</style>
