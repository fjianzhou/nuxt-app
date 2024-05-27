<template>
  <div class="flex justify-center">
    <ClientOnly>
      <n-form
        ref="formRef"
        :model="form"
        :rules="rules"
        :show-label="false"
        style="width: 600px"
      >
        <n-form-item path="bbs_id">
          <n-select
            v-model:value="form.bbs_id"
            :options="options"
            clearable
            placeholder="请输入选择社区"
            class="w-full"
            value-field="id"
            label-field="title"
          />
        </n-form-item>
        <div
          class="bg-white rounded p-5 mb-5 shadow"
          v-for="(item, index) in form.content"
        >
          <div v-if="index > 0" class="flex justify-end mb-2">
            <n-button size="small" @click="removeBlock(index)">
              <n-icon>
                <Close />
              </n-icon>
            </n-button>
          </div>
          <n-form-item>
            <n-input
              v-model:value="item.text"
              type="textarea"
              placeholder="请输入内容"
            />
          </n-form-item>
          <n-form-item>
            <UiUploader v-model="item.images" :max="9" />
          </n-form-item>
        </div>
        <n-form-item>
          <n-button type="info" dashed class="w-full" @click="addBlock">
            添加区块
          </n-button>
        </n-form-item>
        <n-form-item>
          <n-button
            type="primary"
            class="ml-auto"
            :loading="loading"
            @click="onSubmit"
          >
            发布
          </n-button>
        </n-form-item>
      </n-form>
    </ClientOnly>
  </div>
</template>
<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NButton,
  NIcon,
  createDiscreteApi,
} from "naive-ui";
import { Close } from "@vicons/ionicons5";
definePageMeta({
  middleware: ["auth"],
});
const { data: bbsData } = await bbsTypeListApi();
const options = computed(() => (bbsData.value ? bbsData.value.rows : []));
const loading = ref(false);

const formRef = ref(null);
const form = reactive({ bbs_id: null, content: [{ text: "", images: [] }] });
const rules = {
  bbs_id: [
    {
      required: true,
      message: "请选择社区",
    },
  ],
};

const addBlock = () => {
  form.content.push({ text: "", images: [] });
};

const removeBlock = (index) => {
  const { message, dialog } = createDiscreteApi(["dialog", "message"]);

  dialog.warning({
    content: "是否要删除该区域内容",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick() {
      form.content.splice(index, 1);
      message.success("删除成功");
    },
  });
};

const onSubmit = () => {
  formRef.value.validate(async (r) => {
    const { message } = createDiscreteApi(["message"]);
    if (r || form.content.filter((o) => o.text.trim() == "").length > 0) {
      return message.warning("请检查帖子内容是否为空！");
    }
    loading.value = true;
    const { error, data } = await addPostApi(form);
    loading.value = false;
    if (error.value) return;
    message.success("发帖成功");
    navigateTo("/bbs/0/1");
  });
};
</script>
