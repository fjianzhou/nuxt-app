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
      <n-button strong secondary size="small" @click="openInput">
        回复
      </n-button>
      <CommentInput
        v-if="showInput"
        :reply_id="data.reply_id ? data.reply_id : data.id"
        :reply_user="reply_user"
        :post_id="data.post_id"
        :showCancel="true"
        @cancel="cancel"
        @success="emits('commentSuccess')"
      />
      <n-divider />
      <template v-if="data?.post_comments">
        <CommentList
          v-for="item in data?.post_comments"
          :data="item"
          :key="item.id"
          @commentSuccess="emits('commentSuccess')"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "CommentItem" });
import { NAvatar, NButton, NDivider, NTime, NTag } from "naive-ui";
const emits = defineEmits(["commentSuccess"]);
const showInput = ref(false);
const props = defineProps({
  data: Object,
});
const openInput = () => {
  showInput.value = true;
};

const cancel = () => {
  showInput.value = false;
};

const reply_user = computed(() => {
  return {
    id: props.data.user.id,
    username: props.data.user.name,
    avatar: props.data.user.avatar,
  };
});
</script>
