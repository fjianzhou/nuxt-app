<template>
  <div calss="w-100%">
    <n-upload
      v-model:file-list="fileList"
      :action="action"
      name="file"
      :data="data"
      :headers="headers"
      list-type="image-card"
      :max="1"
      @error="handleError"
      @finish="handleSuccess"
      :multiple="false"
      accept="image/png,image/jpeg,image/gif"
    />
  </div>
</template>
<script setup>
import { NUpload, createDiscreteApi } from "naive-ui";
const props = defineProps(["data", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const { action, headers } = uploadConfig();
const fileList = ref([]);
const handleError = (e) => {
  const { message } = createDiscreteApi([message]);
  message.error("上传失败");
};
const handleSuccess = (...e) => {
  const { file, event } = e[0];
  const response = JSON.parse(event.target.response);
  file.url = response.data;
  return file;
};

const initFileList = () => {
  fileList.value = props.modelValue
    ? [
        {
          id: props.modelValue,
          name: props.modelValue,
          status: "finished",
          url: props.modelValue,
        },
      ]
    : [];
};
initFileList();

const stopWatch = watch(
  () => fileList,
  (newVal) => {
    updateModelValue();
  },
  { deep: true }
);

onBeforeUnmount(() => stopWatch());

function updateModelValue() {
  let urls = [];
  fileList.value.forEach((file) => {
    if (file.status === "finished" && file.url) {
      urls.push(file.url);
    }
  });
  emit("update:modelValue", urls[0] || "");
}
</script>
