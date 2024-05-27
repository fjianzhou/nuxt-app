<template>
  <div class="p-5">
    <ClientOnly>
      <n-form :model="form" ref="formRef" :rules="rules" :show-label="false">
        <n-form-item path="content">
          <n-input
            v-model:value="form.content"
            type="textarea"
            placeholder="说两句吧··"
          />
        </n-form-item>
        <n-form-item>
          <div class="flex justify-end w-full">
            <n-button
              type="primary"
              size="small"
              @click="submit"
              :loading="loading"
            >
              回复
            </n-button>
            <n-button v-if="showCancel" size="small" @click="emit('cancel')">
              取消
            </n-button>
          </div>
        </n-form-item>
      </n-form>
    </ClientOnly>
  </div>
</template>

<script setup>
import { NForm, NFormItem, NInput, NButton, createDiscreteApi } from "naive-ui";
const form = reactive({
  content: "",
});
const props = defineProps({
  post_id: String | Number,
  showCancel: {
    type: Boolean,
    default: false,
  },
  reply_id: String | Number,
  reply_user: Object,
});
const emit = defineEmits(["success", "cancel"]);
const formRef = ref(null);

const rules = {
  content: [{ required: true, message: "请输入评论" }],
};

const loading = ref(false);
const submit = () => {
  formRef.value.validate((error) => {
    if (error) return;
    useHasAuth(async () => {
      loading.value = true;
      let d = {
        post_id: parseInt(props.post_id),
        content: form.content,
        reply_id: 0,
      };

      debugger;
      if (props.reply_id != 0) {
        d.reply_id = props.reply_id;
        d.reply_user = { ...props.reply_user };
      }
      const { data, error } = await postReplyApi(d);
      loading.value = false;
      if (error.value) return;
      if (props.showCancel) {
        emit("cancel");
      }
      emit("success", data.value);
      const { message } = createDiscreteApi(["message"]);
      message.success("评论成功");
      form.content = "";
    });
  });
};
</script>
