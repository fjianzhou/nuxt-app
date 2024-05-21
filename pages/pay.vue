<template>
  <div class="flex justify-center">
    <n-card class="w-450px mb-10">
      <ClientOnly>
        <n-alert v-if="ispay" title="支付成功" type="success" class="mb-2">
          正在跳转...
        </n-alert>
        <n-alert v-if="isTimeOut" title="支付已超时" type="error" class="mb-2">
          请刷新页面重新支付
        </n-alert>
        <h4 class="text-xl mb-2">微信支付</h4>
        <p class="text-sm text-gray-500 flex">
          距离二维码过期还剩
          <TimeBox
            class="text-rose-500"
            :expire="30"
            @end="handleTimeOut"
          />，过期后请刷新页面重新获取
        </p>
        <h5 class="flex justify-center py-5">
          支付总额: <IndexComponentsPrice :value="data.price" />
        </h5>
        <QrCode :data="data.code_url" />
        <div class="flex justify-center items-center py-4">
          <n-icon size="35" class="text-green-500">
            <ScanCircleOutline />
          </n-icon>
          <div class="p-l-2 text-gray-500 text-sm">
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
        </div>
      </ClientOnly>
    </n-card>
  </div>
</template>
<script setup>
import { NCard, NIcon, NAlert } from "naive-ui";
import { ScanCircleOutline } from "@vicons/ionicons5";
import { setInterval } from "#imports";
const route = useRoute();
const { data, error } = await orderWxpayApi({
  no: route.query.no,
});

const isTimeOut = ref(false);
const handleTimeOut = () => {
  isTimeOut.value = true;
};

const ispay = ref(false);
const timer = ref(null);
const handleSuccess = () => {
  ispay.value = true;
  if (timer.value) {
    clearInterval(timer.value);
  }
  setTimeout(() => {
    navigateTo("/user/buy/1", { replace: true });
  }, 1000);
};
const checkIsPay = () => {
  if (timer.value) {
    clearInterval(timer.value);
  }
  timer.value = setInterval(async () => {
    const { data, error } = await getWXpayStatusApi({ no: route.query.no });
    if (!error.value && data.value.trade_state == "SUCCESS") {
      handleSuccess();
    }
  }, 2000);
};

onMounted(() => {
  if (!error.value) {
    checkIsPay();
  }
});
onBeforeUnmount(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});
</script>
