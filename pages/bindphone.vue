<template>
  <n-form
    class="w-340px"
    ref="formRef"
    :model="form"
    :rules="rules"
    size="medium"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
    <n-form-item :shwo-label="false" path="phone">
      <n-input v-model:value="form.phone" type="text" placeholder="手机号" />
    </n-form-item>
    <n-form-item :shwo-label="false" path="code">
      <n-input-group>
        <n-input
          v-model:value="form.code"
          show-password-on="mousedown"
          placeholder="验证码"
          :style="{ width: '75%' }"
        />
        <UiSendCode :phone="form.phone" />
      </n-input-group>
    </n-form-item>
    <div>
      <n-button
        class="w-full"
        type="primary"
        @click="onSubmit"
        :loading="loading"
      >
        绑定
      </n-button>
    </div>
  </n-form>
</template>

<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  createDiscreteApi,
  NInputGroup,
} from "naive-ui";
definePageMeta({
  layout: "login",
  title: "绑定手机号",
});
const route = useRoute();
const formRef = ref(null);
const loading = ref(false);
const form = reactive({
  phone: "",
  code: "",
});

const rules = {
  phone: [
    {
      required: true,
      message: "输入手机号",
      trigger: ["input", "blur"],
    },
  ],
  code: [
    {
      required: true,
      message: "输入手机验证码",
      trigger: ["input", "blur"],
    },
  ],
};

useEnterEvent(() => onSubmit());
const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;
    loading.value = true;
    const { data, error } = await bindPhoneApi({ ...form });
    loading.value = false;
    if (error.value) return;
    const { message } = createDiscreteApi(["message"]);
    message.success("绑定成功");
    navigateTo(route.query.from || "/", { replace: true });
  });
};
</script>
