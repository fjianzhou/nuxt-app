<template>
  <n-button
    strong
    secondary
    :type="is_fava ? 'tertiary' : 'primary'"
    size="tiny"
    :loading="loading"
    @click="handleFave"
  >
    收藏
  </n-button>
</template>
<script setup>
import { NButton, createDiscreteApi } from "naive-ui";
const props = defineProps(["isFava", "goodsId", "type"]);
const loading = ref(false);
const is_fava = ref(props.isFava);
const handleFave = () => {
  useHasAuth(async () => {
    loading.value = true;
    const body = { goods_id: props.goodsId, type: props.type };
    const { error } = is_fava.value
      ? await uncollectApi(body)
      : await collectApi(body);
    if (error.value) return;
    const { message } = createDiscreteApi(["message"]);
    message.success(is_fava.value ? "取消收藏成功" : "收藏成功");
    is_fava.value = !is_fava.value;
    loading.value = false;
  });
};
</script>
