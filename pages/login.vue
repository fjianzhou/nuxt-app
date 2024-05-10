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
    <n-form-item :shwo-label="false" path="username">
      <n-input
        v-model:value="form.username"
        type="text"
        placeholder="用户名/手机/邮箱"
      />
    </n-form-item>
    <n-form-item :shwo-label="false" path="password">
      <n-input
        v-model:value="form.password"
        type="password"
        show-password-on="mousedown"
        placeholder="密码"
      />
    </n-form-item>
    <n-form-item
      first
      :shwo-label="false"
      path="repassword"
      v-if="type !== 'login'"
    >
      <n-input
        v-model:value="form.repassword"
        type="password"
        show-password-on="mousedown"
        placeholder="确认密码"
      />
    </n-form-item>
    <div class="flex justify-between w-full mb-2">
      <n-button quaternary type="primary" size="tiny" @click="chageType">
        {{ type === "login" ? "注册" : "登录" }}</n-button
      >
      <nuxt-link to="/forget">
        <n-button quaternary type="primary" size="tiny">忘记密码？</n-button>
      </nuxt-link>
    </div>
    <div>
      <n-button
        class="w-full"
        type="primary"
        @click="onSubmit"
        :loading="loading"
      >
        {{ type === "login" ? "登录" : "立即创建" }}
      </n-button>
    </div>
    <div
      class="flex justify-center items-center w-full text-xs mt-5 text-gray-500"
    >
      注册即同意
      <n-button quaternary type="primary" size="tiny">《服务协议》</n-button>
      和
      <n-button quaternary type="primary" size="tiny">《隐私协议》</n-button>
    </div>
  </n-form>
</template>

<script setup>
import { NForm, NFormItem, NInput, NButton, createDiscreteApi } from "naive-ui";
definePageMeta({
  layout: "login",
  middleware: ["only-visitor"],
});
const title = ref("登录");
useHead({ title });
const route = useRoute();
const loading = ref(false);
const type = ref("login");
const formRef = ref(null);
const form = reactive({
  username: "",
  password: "",
  repassword: "",
});

const rules = computed(() => {
  let r = {
    username: [
      {
        required: true,
        message: "请输入用户名",
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
  };
  if (type.value !== "login") {
    r.repassword = [
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
    ];
  }
  return r;
});

useEnterEvent(() => onSubmit());
const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;
    loading.value = true;
    const { data, error } =
      type.value === "login"
        ? await loginApi({ ...form })
        : await regUserApi({ ...form });
    loading.value = false;
    if (error.value) return;
    const { message } = createDiscreteApi(["message"]);
    message.success(type.value === "login" ? "登录成功" : "注册成功");
    if (type.value === "login") {
      const token = useCookie("token");
      token.value = data.value.token;
      const user = useUser();
      user.value = data.value;
      navigateTo(route.query.from || "/", { replace: true });
    } else {
      chageType();
    }
  });
};
const chageType = () => {
  type.value = type.value === "login" ? "reg" : "login";
  title.value = type.value === "login" ? "注册" : "登录";
  route.meta.title = type.value === "login" ? "登录" : "注册";
  form.password = "";
  form.username = "";
  form.repassword = "";
  formRef.value.restoreValidation();
};
</script>
