<template>
  <li class="detail-menu-item" :class="{ active: active }">
    <n-tag
      v-if="item.type"
      type="info"
      :bordered="false"
      size="small"
      class="mr-3"
    >
      {{ typeToText[item.type] }}
    </n-tag>
    章节{{ index + 1 }}.{{ item.title }}
    <n-tag
      v-if="item.price == 0 || item.isfree"
      type="success"
      :bordered="false"
      size="small"
      class="ml-auto"
    >
      免费
    </n-tag>
  </li>
</template>
<script setup>
import { NTag } from "naive-ui";
const props = defineProps({
  item: Object,
  index: Number,
  active: {
    type: Boolean,
    default: false,
  },
});
const typeToText = {
  media: "图文",
  video: "视频",
  audio: "音频",
};
</script>

<style lang="scss">
.detail-menu-item {
  @apply flex p-5 border-b cursor-pointer text-sm hover:(\!bg-gray-100) active:(\!bg-gray-200);
}
.active {
  @apply bg-gray-200;
}
</style>
