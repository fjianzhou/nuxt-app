<template>
  <ui-card>
    <ui-card-head>
      <span class="mb-2 text-xs text-gray-400">学习进度 </span>
      <n-progress
        type="line"
        :percentage="data.progress"
        :show-indicator="false"
      />
    </ui-card-head>
    <ui-card-body>
      <n-tag v-if="data.type" size="small">{{ typeToText[data.type] }}</n-tag>
      <span class="ml-3">{{ data.title }}</span>
      <n-button
        type="primary"
        size="tiny"
        class="ml-auto"
        @click="open(data.id)"
      >
        继续学习1
      </n-button>
    </ui-card-body>
  </ui-card>
</template>
<script setup>
import { NProgress, NButton, NTag } from "naive-ui";
const props = defineProps(["data"]);
const typeToText = {
  audio: "音频",
  video: "视频",
  media: "图文",
  colum: "专栏",
  book: "电子书",
  course: "课程",
};

const route = useRoute();
const open = (id) => {
  navigateTo(`/detail/${route.query.tab}/${id}`);
};
</script>
