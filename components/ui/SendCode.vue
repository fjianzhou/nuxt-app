<template>
  <n-button
    type="primary"
    :loading="loading"
    ghost
    :disabled="time > 0 && !phone"
    @click="send"
  >
    {{ buText }}
  </n-button>
</template>

<script setup>
import { NButton, createDiscreteApi } from "naive-ui";
const props = defineProps(["phone"]);
const loading = ref(false);
const timerId = ref(undefined);
const time = ref(0);

const buText = computed(() => {
  if (loading.value) {
    return "发送中。。。";
  }
  if (time.value > 0) {
    return `${time.value}s`;
  }
  return "获取验证码";
});

const send = async () => {
  loading.value = true;
  const { data, error } = await getCaptchaApi({ phone: props.phone });
  loading.value = false;
  if (error.value) return;
  time.value = 60;
  if (timerId.value) {
    clearInterval(timerId.value);
  }
  timerId.value = setInterval(() => {
    time.value--;
    if (time.value <= 0) {
      clearInterval(timerId.value);
    }
  }, 1000);
  const { message } = createDiscreteApi(["message"]);
  const msg =
    data.value === "ok"
      ? "发送成功"
      : `当前是演示环境，你的验证码是：${data.value}`;
  message.success(msg);
};
</script>
