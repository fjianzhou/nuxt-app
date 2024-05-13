<template>
  <div class="p-5">
    <n-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-placement="left"
      label-width="80"
    >
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="user.username" disabled />
      </n-form-item>
      <n-form-item label="头像" path="avatar">
        <ClientOnly>
          <template #fallback>
            <div
              class="rounded bg-gray-50 flex items-center justify-center w-94px h-94px"
            >
              <n-spin size="small"></n-spin>
            </div>
          </template>
          <UiUploader v-model="form.avatar" />
        </ClientOnly>
      </n-form-item>
      <n-form-item label="昵称" path="nickname">
        <n-input v-model:value="form.nickname" placeholder="请输入昵称" />
      </n-form-item>
      <n-form-item label="性别" path="sex">
        <n-radio-group v-model:value="form.sex">
          <n-space>
            <n-radio
              v-for="song in songs"
              :key="song.value"
              :value="song.value"
            >
              {{ song.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <div class="flex justify-end">
        <n-button type="primary" @click="onSubmit" :loading="loading">
          提交修改
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
  NRadio,
  NRadioGroup,
  NButton,
  NSpace,
  NSpin,
  createDiscreteApi,
} from "naive-ui";
useHead({ title: "修改资料" });
const user = useUser();
const formRef = ref(null);
const loading = ref(false);
const songs = [
  {
    value: "未知",
    label: "未知",
  },
  {
    value: "男",
    label: "男",
  },
  {
    value: "女",
    label: "女",
  },
];

const form = reactive({
  avatar: "",
  nickname: "",
  sex: "",
});
if (user.value) {
  form.avatar = user.value.avatar;
  form.nickname = user.value.nickname;
  form.sex = user.value.sex;
}

const rules = {
  nickname: [
    {
      required: true,
      message: "昵称不能为空",
    },
  ],
  sex: [
    {
      required: true,
      message: "性别不能为空",
    },
  ],
};

const onSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return;
    loading.value = true;
    const { data, error } = await updateInfoApi({ ...form });
    if (error.value) {
      return;
    }
    const { message } = createDiscreteApi(["message"]);
    message.success("修改成功");
    useRefreshUserInfo();
    loading.value = false;
  });
};
</script>
