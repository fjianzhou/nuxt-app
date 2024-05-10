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
      <n-input v-model:value="form.phone" type="text" placeholder="手机号码" />
    </n-form-item>
    <n-form-item :shwo-label="false" path="code">
      <n-input-group>
        <n-input
          v-model:value="form.code"
          type="text"
          placeholder="验证码"
          :style="{ width: '75%' }"
        />
        <UiSendCode :phone="form.phone" />
      </n-input-group>
    </n-form-item>
    <n-form-item :shwo-label="false" path="password">
      <n-input
        v-model:value="form.password"
        type="password"
        show-password-on="mousedown"
        placeholder="密码"
      />
    </n-form-item>
    <n-form-item first :shwo-label="false" path="repassword">
      <n-input
        v-model:value="form.repassword"
        :disabled="!form.password"
        type="password"
        show-password-on="mousedown"
        placeholder="确认密码"
      />
    </n-form-item>
    <div class="flex justify-between w-full mb-2">
      <n-button
        quaternary
        type="primary"
        size="tiny"
        @click="navigateTo('/login', { replace: true })"
      >
        登录
      </n-button>
    </div>
    <div>
      <n-button
        class="w-full"
        type="primary"
        @click="onSubmit"
        :loading="loading"
      >
        重置密码
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
  title: "忘记密码",
  layout: "login",
  middleware: ["only-visitor"],
});
const router = useRouter();
const loading = ref(false);
const formRef = ref(null);
const form = reactive({
  phone: "",
  code: "",
  password: "",
  repassword: "",
});

const rules = {
  phone: [
    {
      required: true,
      message: "请输入手机号",
      trigger: ["input", "blur"],
    },
  ],
  code: [
    {
      required: true,
      message: "请输入验证码",
      trigger: ["input", "blur"],
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: ["input", "blur"],
    },
  ],
  repassword: [
    {
      required: true,
      message: "请再次输入密码",
    },
    {
      validator: (rule, value) => {
        return value === form.password;
      },
      message: "两次密码输入不一致",
      trigger: ["input", "blur"],
    },
  ],
};

useEnterEvent(() => onSubmit());
const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;
    loading.value = true;
    const { data, error } = await forgetApi({ ...form });
    loading.value = false;
    if (error.value) return;
    const { message } = createDiscreteApi(["message"]);
    message.success("重置密码成功");
    router.go(-1);
  });
};
</script>
