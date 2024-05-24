<template>
  <div class="flex p-5">
    <n-avatar :size="40" :src="data.user.avatar" />
    <div class="ml-2 flex-1">
      <h4>{{ data.user.name }}</h4>
      <small class="text-gray-400">
        <n-time :time="new Date(data.created_time)" />
      </small>
      <p class="my-3">
        <n-tag
          size="small"
          :bordered="false"
          v-if="data?.reply_user"
          style="opacity: 0.5"
        >
          @{{ data?.reply_user?.username }}
        </n-tag>
        {{ data.content }}
      </p>
      <n-button strong secondary size="small">回复</n-button>
      <n-divider />
      <template v-if="data?.post_comments">
        <CommentList
          v-for="item in data?.post_comments"
          :data="item"
          :key="item.id"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "CommentItem" });
import { NAvatar, NButton, NDivider, NTime, NTag } from "naive-ui";
const props = defineProps({
  data: Object,
});
</script>
