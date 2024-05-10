<template>
  <UiCard>
    <UiCardHead class="flex justify-between items-center">
      <span> 订单时间：{{ data.created_time }}</span>
      <span> 订单号：{{ data.no }}</span>
    </UiCardHead>
    <UiCardBody> {{ data.goods }} </UiCardBody>
    <UiCardFooter class="flex justify-between items-center">
      <span v-if="data.type !== 'default'">{{ typeToText[data.type] }}</span>
      <IndexComponentsPrice :value="data.price"></IndexComponentsPrice>
      <span
        class="ml-auto"
        :class="{
          'text-green-600': data.status === 'success',
        }"
      >
        {{ statusToText[data.status] }}
      </span>
      <n-button
        v-if="data.status === 'pendding'"
        type="primary"
        class="ml-3"
        size="small"
        @click="pay(data.no)"
      >
        去支付
      </n-button>
    </UiCardFooter>
  </UiCard>
</template>

<script setup>
import { NButton } from "naive-ui";
defineProps(["data"]);
const statusToText = {
  closed: "关闭",
  success: "支付成功",
  pendding: "待支付",
};
const typeToText = {
  group: "拼团",
  flashsale: "秒杀",
};
const pay = (no) => {
  console.log(no);
  navigateTo({ name: "buy", query: { no } });
};
</script>
