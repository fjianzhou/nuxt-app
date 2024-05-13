<template>
  <div class="p-5">
    <n-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-placement="left"
      label-width="80"
      require-mark-placement="right-hanging"
    >
      <n-form-item label="原密码" path="opassword">
        <n-input
          v-model:value="form.opassword"
          type="password"
          show-password-on="mousedown"
          placeholder="原密码"
        />
      </n-form-item>
      <n-form-item label="新密码" path="password">
        <n-input
          v-model:value="form.password"
          type="password"
          show-password-on="mousedown"
          placeholder="新密码"
        />
      </n-form-item>
      <n-form-item first label="确认密码" path="repassword">
        <n-input
          v-model:value="form.repassword"
          :disabled="!form.password"
          type="password"
          show-password-on="mousedown"
          placeholder="确认密码"
        />
      </n-form-item>
      <div class="flex justify-end w-full mb-2">
        <n-button type="primary" @click="onSubmit" :loading="loading">
          立即修改
        </n-button>
      </div>
    </n-form>
  </div>
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

useHead({ title: "修改密码" });
const router = useRouter();
const loading = ref(false);
const formRef = ref(null);
const form = reactive({
  opassword: "",
  password: "",
  repassword: "",
});

const rules = {
  opassword: [
    {
      required: true,
      message: "请输入旧密码",
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
    const { data, error } = await updatePasswordApi({ ...form });
    loading.value = false;
    if (error.value) return;
    const { message } = createDiscreteApi(["message"]);
    message.success("修改密码成功");
    userLogout();
  });
};
</script>
