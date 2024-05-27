<template>
  <n-breadcrumb class="mb-3">
    <n-breadcrumb-item>
      <NuxtLink to="/">首页</NuxtLink>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <NuxtLink to="/bbs/0/1">社区列表</NuxtLink>
    </n-breadcrumb-item>
    <n-breadcrumb-item>{{ title }}</n-breadcrumb-item>
  </n-breadcrumb>
  <n-grid :x-gap="20">
    <n-grid-item :span="18">
      <section class="bg-white rounded mb-5">
        <LoadingGroup :error="error" :pending="pending">
          <div class="flex p-5 pb-0">
            <n-avatar :size="40" :src="data.user.avatar" />
            <div class="ml-2 flex-1">
              <h4>{{ data.user.name }}</h4>
              <small class="text-gray-500">
                发布时间: {{ data.created_time }}
              </small>
              <n-tag
                v-if="data.is_top"
                :bordered="false"
                type="success"
                size="small"
              >
                置顶
              </n-tag>
            </div>
          </div>
          <n-divider />
          <div class="p-5 p-t-0">
            <div v-for="(item, index) in data.content" :key="index">
              <p class="mb-3">{{ item.text }}</p>
              <div class="flex flex-col items-center">
                <n-image-group>
                  <n-image
                    v-for="(item, index) in item.images"
                    :key="index"
                    :src="item"
                    object-fit="cover"
                    class="shadow mb-3 rounded img"
                  />
                </n-image-group>
              </div>
            </div>

            <div class="flex justify-around">
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
            </div>
          </div>
        </LoadingGroup>
        <CommentInput :post_id="id" @success="handleComment" />
        <n-divider />
        <Comment :post_id="id" ref="commentRef" />
      </section>
    </n-grid-item>
    <n-grid-item :span="6">
      <NuxtLink to="/post/add">
        <n-button type="primary" class="w-full m-b-5">发布帖子</n-button>
      </NuxtLink>
      <HotCourseList />
    </n-grid-item>
  </n-grid>
</template>
<script setup>
import {
  NBreadcrumb,
  NBreadcrumbItem,
  NGrid,
  NGridItem,
  NButton,
  NDivider,
  NAvatar,
  NTag,
  NImageGroup,
  NImage,
  NIcon,
} from "naive-ui";
import { ThumbsUpSharp } from "@vicons/ionicons5";
const route = useRoute();
const id = route.params.id;
const { error, data, pending } = await postReadApi({ id });
const { handleSupport, supportLoading } = useHandleSupportPost();

const title = computed(() => {
  if (pending.value) {
    return "帖子详情";
  }
  let t = data.value?.desc?.text;
  if (t && t.length >= 10) {
    t = t.slice(0, 10) + "...";
  }
  return t;
});
useHead({ title: title });
const commentRef = ref(null);
const handleComment = (data) => {
  commentRef.value.updatePage(1);
};
</script>

<style>
.img img {
  @apply max-w-100%;
}
</style>
