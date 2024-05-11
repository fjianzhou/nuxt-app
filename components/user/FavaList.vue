<template>
  <div
    class="border-1px border-#e5e7eb b-style-solid flex p-3 mb-5 items-center"
  >
    <n-tag :bordered="false" type="info" size="small" class="mr-2">
      {{ typeToText[data.type] }}
    </n-tag>
    <n-image :src="data.goods.cover" class="rounded mr-2" height="40px" />
    <span class="text-gray-500 text-sm">{{ data.goods.title }}</span>
    <n-button
      class="ml-auto m-r-3"
      type="primary"
      size="tiny"
      @click="openDetail"
    >
      查看
    </n-button>
    <n-button
      type="error"
      size="tiny"
      :loading="deleteLoading"
      @click="deleteCollect(data)"
    >
      删除
    </n-button>
  </div>
</template>

<script setup>
import { NButton, NTag, NImage, createDiscreteApi } from "naive-ui";
const props = defineProps(["data"]);
const emit = defineEmits(["deleteCollect"]);
const deleteLoading = ref(false);
const typeToText = {
  course: "课程",
  book: "电子书",
  column: "专栏",
  live: "直播",
};
const deleteCollect = (data) => {
  const { dialog, message } = createDiscreteApi(["dialog", "message"]);
  dialog.warning({
    content: "是否删除该收藏？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      deleteLoading.value = true;
      emit("deleteCollect", {
        goods_id: data.goods.id,
        type: data.type,
        success() {
          deleteLoading.value = false;
          message.success("收藏删除成功");
        },
        fail() {
          deleteLoading.value = false;
        },
      });
    },
  });
};

const openDetail = () => {
  navigateTo(`/detail/${props.data.type}/${props.data.goods.id}`);
};
</script>
