<template>
  <div class="border-b-#e5e7eb border-b-style-solid b-b-1px p-5">
    <div class="cursor-pointer text-gray-600" @click="openPost">
      <n-tag v-if="data.is_top" :bordered="false" type="success" size="small">
        置顶
      </n-tag>
      {{ data.desc.text }}
    </div>
    <div class="mt-3 cursor-pointer" style="max-width: 500px">
      <n-image
        v-for="img in data.desc.images"
        :src="img"
        :width="data.desc.images.length == 1 ? 300 : 150"
        :heigth="data.desc.images.length == 1 ? 200 : 100"
        class="mr-3 mb-2 rounded"
        preview-disabled
      />
    </div>
    <div class="flex mt-5">
      <n-space>
        <n-button
          secondary
          strong
          size="tiny"
          :type="data.issupport ? 'primary' : 'tertiary'"
          :loading="supportLoading"
          @click.stop="handleSupport(data)"
        >
          <template #icon>
            <n-icon><ThumbsUpSharp /></n-icon>
          </template>
          点赞{{ data.support_count || "" }}
        </n-button>

        <n-button secondary strong size="tiny">
          <template #icon>
            <n-icon><ChatboxEllipsesOutline /></n-icon>
          </template>
          评论{{ data.comment_count || "" }}
        </n-button>
        <n-button text size="tiny">作者：{{ data.user.name }}</n-button>
        <n-button
          v-if="showDel"
          type="error"
          size="tiny"
          :loading="deleteLoading"
          @click.stop="deletePost(data.id)"
        >
          删除
        </n-button>
      </n-space>
    </div>
  </div>
</template>
<script setup>
import {
  NImage,
  NTag,
  NButton,
  NIcon,
  NSpace,
  createDiscreteApi,
} from "naive-ui";
import { ThumbsUpSharp, ChatboxEllipsesOutline } from "@vicons/ionicons5";
const props = defineProps({
  data: Object,
  showDel: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["deletePost"]);
const deleteLoading = ref(false);
const { handleSupport, supportLoading } = useHandleSupportPost();
const deletePost = (id) => {
  const { dialog, message } = createDiscreteApi(["dialog", "message"]);
  dialog.warning({
    content: "是否要删除该帖子？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: async () => {
      deleteLoading.value = true;
      emit("deletePost", {
        id,
        success() {
          deleteLoading.value = false;
          message.success();
        },
        fail() {
          deleteLoading.value = false;
        },
      });
    },
  });
};
const openPost = (item) => {
  navigateTo("/post_detail/" + props.data.id);
};
</script>
