<template>
  <div class="w-100%">
    <n-upload
      v-model:file-list="fileList"
      :action="action"
      name="file"
      :data="data"
      :headers="headers"
      list-type="image-card"
      :max="max"
      @error="handleError"
      @finish="handleSuccess"
      :multiple="max > 1"
      accept="image/png,image/jpeg,image/gif"
    />
  </div>
</template>
<script setup>
import { NUpload, createDiscreteApi } from "naive-ui";

const props = defineProps({
  data: Object,
  modelValue: [String, Array],
  max: {
    type: Number,
    default: 1,
  },
});
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
  if (typeof props.modelValue === "string") {
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
  } else {
    fileList.value = props.modelValue.map((url) => {
      return {
        id: url,
        name: url,
        status: "finished",
        url,
      };
    });
  }
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
  emit("update:modelValue", props.max === 1 ? urls[0] || "" : urls);
}
</script>
