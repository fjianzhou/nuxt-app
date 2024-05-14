<template>
  <LoadingGroup :pending="pending">
    <section class="detail-top">
      <n-image
        :src="data.cover"
        object-fit="cover"
        class="image"
        width="340"
        heigh="200"
      />
      <div class="info">
        <div class="flex flex-col items-start">
          <div class="flex items-center">
            <span class="text-xl mr-2">{{ data.title }}</span>
            <FavaBtn :isFava="data.isfava" :goodsId="data.id" :type="type" />
          </div>
          <p class="my-2 text-xs text-gray-400">{{ subTitle }}</p>
          <CouponModal />
          <div v-if="!data.isbuy">
            <IndexComponentsPrice :value="data.price" class="text-xl" />
            <IndexComponentsPrice
              :value="data.t_price"
              through
              class="ml-1 text-xs"
            />
          </div>
        </div>
        <div class="mt-auto" v-if="!data.isbuy">
          <n-button type="primary" :loading="learnLoading" @click="learn">
            立即学习
          </n-button>
        </div>
      </div>
    </section>
    <n-grid :x-gap="20">
      <n-grid-item :span="18">
        <section class="detail-bottom">
          <UiTab class="border-b-1px border-b-#e5e7eb border-b-style-solid">
            <UiTabItem active> 详情</UiTabItem>
          </UiTab>
          <div class="content" v-html="contentText"></div>
        </section>
      </n-grid-item>
      <n-grid-item :span="6">
        <HotCourseList />
      </n-grid-item>
    </n-grid>
  </LoadingGroup>
</template>

<script setup>
import { NImage, NButton, NGrid, NGridItem } from "naive-ui";
const route = useRoute();
const { id, type } = route.params;
const { data, error, pending, refresh } = await getCourseDetailApi({ id });
const title = computed(() => (!pending.value ? data.value?.title : "详情页"));
useHead({ title });
const learnLoading = ref(false);

const typeToText = {
  media: "图文",
  video: "视频",
  audio: "音频",
};
const subTitle = computed(() => {
  let pre = "";
  if (type === "course") {
    pre = `【${typeToText[data.value.type]}】`;
  }
  return `${pre}${data.value.sub_count}人学过`;
});
const contentText = computed(() => {
  let content = "";
  if (data.value.type === "media" && data.value.isbuy) {
    content = data.value.content;
  } else {
    content = data.value.try;
  }
  return content;
});

const learn = () => {
  useHasAuth(async () => {
    if (data.value.price == 0) {
      learnLoading.value = true;
      const { error: learnError } = await orderLearnApi({
        goods_id: data.value.id,
        type,
      });
      if (!learnError.value) {
        refresh();
      }
      learnLoading.value = false;
    } else {
    }
  });
};
</script>

<style lang="scss" scoped>
.detail-top {
  @apply rounded bg-white flex p-5 my-5;
  .image {
    @apply rounded w-340px h-200px mr-5;
  }
  .info {
    @apply flex-1 flex  flex-col py-2;
  }
}
.detail-bottom {
  @apply bg-white rounded mb-5;

  .content {
    @apply px-5 p-b-5;

    :deep(img) {
      max-width: 100% !important;
    }
  }
}
</style>
