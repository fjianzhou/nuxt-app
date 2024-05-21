<template>
  <LoadingGroup :pending="pending">
    <section
      class="py-4"
      v-if="data.isbuy && data.type != '' && type == 'course'"
    >
      <ClientOnly>
        <template #fallback>
          <LoadingSkeleton />
        </template>
        <PlayerAudio
          v-if="data.type == 'audio'"
          :title="data.title"
          :url="data.content"
          :cover="data.cover"
        />
        <PlayerVideo v-if="data.type == 'video'" :url="data.content" />
      </ClientOnly>
    </section>
    <section v-else class="detail-top">
      <n-image
        :src="data.cover"
        object-fit="cover"
        :class="type === 'book' ? 'book-image' : 'image'"
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
          <template v-if="!data.isbuy">
            <DetailActiveBar :data="data" v-if="data.group || data.flashsale" />
            <template v-else>
              <div>
                <IndexComponentsPrice :value="data.price" class="text-xl" />
                <IndexComponentsPrice
                  :value="data.t_price"
                  through
                  class="ml-1 text-xs"
                />
              </div>
              <CouponModal v-if="type != 'live'" />
              <LiveStatusBar
                v-else
                :start="data.start_time"
                :end="data.end_time"
              />
            </template>
          </template>
        </div>
        <div class="mt-auto" v-if="!data.isbuy">
          <template v-if="type == 'book'">
            <template v-if="menus.length > 0">
              <n-button type="primary" :loading="learnLoading" @click="buy">
                立即学习
              </n-button>
              <n-button
                strong
                secondary
                type="primary"
                class="ml-2"
                @click="learn({ id: freeId })"
                v-if="freeId"
              >
                免费试看
              </n-button>
            </template>
            <n-button v-else type="primary"> 敬请期待 </n-button>
          </template>
          <n-button v-else type="primary" :loading="learnLoading" @click="buy">
            {{ butText }}
          </n-button>
        </div>
      </div>
    </section>
    <n-grid :x-gap="20">
      <n-grid-item :span="18">
        <DetailGroupWorks
          v-if="!data.isbuy && data.group"
          :group_id="data.group.id"
        />
        <section class="detail-bottom">
          <UiTab class="border-b-1px border-b-#e5e7eb border-b-style-solid">
            <UiTabItem
              @click="changeTab(item.value)"
              :active="currentTab === item.value"
              v-for="item in tabs"
            >
              {{ item.label }}
            </UiTabItem>
          </UiTab>
          <div
            v-if="currentTab === 'content'"
            class="content"
            v-html="contentText"
          ></div>
          <DetailMenu v-else>
            <DetailMenuItem
              v-for="(item, index) in menus"
              :item="item"
              :index="index"
              :key="item.id"
              @click="learn(item)"
            />
            <Empty v-if="menus?.length == 0" desc="暂无目录" />
          </DetailMenu>
        </section>
      </n-grid-item>
      <n-grid-item :span="6">
        <HotCourseList />
      </n-grid-item>
    </n-grid>
  </LoadingGroup>
</template>

<script setup>
import { NImage, NButton, NGrid, NGridItem, createDiscreteApi } from "naive-ui";
const route = useRoute();
const { id, type } = route.params;

const createQuery = () => {
  let query = { id };
  const { column_id, flashsale_id, group_id } = route.query;
  if (column_id) {
    query.column_id = column_id;
  }
  if (flashsale_id) {
    query.flashsale_id = flashsale_id;
  }
  if (group_id) {
    query.group_id = group_id;
  }
  console.log(query);
  return query;
};

const { data, error, pending, refresh } = await readDetailApi(
  type,
  createQuery()
);
const butText = computed(() => {
  if (data.value.group) {
    return "立即拼团";
  } else if (data.value.flashsale) {
    return "立即秒杀";
  }
  return "立即学习";
});
const title = computed(() => (!pending.value ? data.value?.title : "详情页"));
useHead({
  title,
});
const learnLoading = ref(false);
const { tabs, currentTab, changeTab } = useInitDetailTabs(type);

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

const buy = () => {
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
      return;
    }
    if (data.value.group) {
      learnLoading.value = true;
      const { error, data: orderResult } = await orderSavetApi(
        { group_id: data.value.group.id },
        "group"
      );
      if (!error.value) {
        navigateTo(`/pay?no=${orderResult.value.no}`);
      }
      learnLoading.value = false;
      return;
    }

    let ty = "course";
    let id = data.value.id;
    if (type == "book") {
      ty = "book";
    } else if (type == "live") {
      ty = "live";
    } else if (type == "column") {
      ty = "column";
    }
    if (data.value.flashsale) {
      ty = "flashsale";
      id = data.value.flashsale.id;
    }
    navigateTo({
      name: "createorder",
      query: { id, type: ty },
    });
  });
};

const freeId = computed(() => {
  let fid = 0;
  if (type == "book" && data.value) {
    let item = data.value.book_details.find((o) => o.isfree == 1);
    if (item) {
      fid = item.id;
    }
  }
  return fid;
});

const learn = (item) => {
  useHasAuth(async () => {
    const { message } = createDiscreteApi(["message"]);
    if (type == "column" && item.price != 0 && !data.value.isbuy) {
      return message.error("请先购买该专栏");
    }
    let url = "";
    if (type == "column") {
      url = `/detail/course/${item.id}?column_id=${data.value.id}`;
    } else if (type == "book") {
      url = `/book/${data.value.id}/${item.id}`;
    }
    console.log("url===>", url);
    navigateTo(url);
  });
};

const menus = computed(() => {
  return (
    (type === "book" ? data.value.book_details : data.value.column_courses) ||
    []
  );
});

function useInitDetailTabs(t) {
  const tabs = computed(() => {
    let baseTabs = [
      {
        label: "详情",
        value: "content",
      },
    ];

    if (["column", "book"].includes(t)) {
      baseTabs.push({
        label: "目录",
        value: "menu",
      });
    }
    return baseTabs;
  });
  const currentTab = ref("content");
  const changeTab = (t) => (currentTab.value = t);
  return { tabs, currentTab, changeTab };
}
</script>

<style lang="scss" scoped>
.detail-top {
  @apply rounded bg-white flex p-5 my-5;
  .image {
    @apply rounded w-340px h-200px mr-5;
  }
  .book-image {
    @apply rounded w-130px h-180px mr-8 ml-3;
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
