<template>
  <div>
    <BbsTabs />
    <n-grid :x-gap="20">
      <n-grid-item :span="18">
        <LoadingGroup
          :pending="pending"
          :error="error"
          :isEmpty="rows.length <= 0"
        >
          <div class="bg-white rounded">
            <UiTab>
              <UiTabItem
                v-for="(item, index) in tabsType"
                :key="item"
                :active="is_top == index"
                @click="handleIsTop(index)"
              >
                {{ item }}
              </UiTabItem>
            </UiTab>
            <PostList
              v-for="item in rows"
              :key="item.id"
              :data="item"
              :showDel="false"
            />
          </div>

          <div class="flex justify-center items-center mt-5 mb-10">
            <n-pagination
              size="large"
              :page="page"
              :page-count="pageCount"
              :page-size="pageSize"
              :page-sizes="[10, 20, 30, 40]"
              @update:page="updatePage"
              @update:page-size="updatePageSize"
              show-size-picker
            />
          </div>
        </LoadingGroup>
      </n-grid-item>
      <n-grid-item :span="6">
        <n-button type="primary" class="w-full m-b-5">发布帖子</n-button>
        <HotCourseList />
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script setup>
import { NGrid, NGridItem, NButton, NPagination } from "naive-ui";
definePageMeta({
  middleware(to, from) {
    const { bbs_id, page } = to.params;
    if (!isNaN(+bbs_id) && !isNaN(+page)) {
      useHead({ title: "社区问答列表" });
      return true;
    }
    return abortNavigation("页面不存在");
  },
});
const route = useRoute();
const is_top = ref(route.query.is_top);
const bbs_id = ref(route.params.bbs_id);
const tabsType = ref(["最新", "置顶"]);

const updatePage = (page) => {
  navigateTo({
    name: "bbs-bbs_id-page",
    params: { ...route.params, page },
    query: { ...route.query, limit: pageSize.value },
  });
};

const updatePageSize = (size) => {
  pageSize.value = size;
  navigateTo({
    name: "bbs-bbs_id-page",
    params: { ...route.params },
    query: { ...route.query, limit: size },
  });
};

const { page, rows, pageCount, pageSize, pending, error } = await usePage(
  (queryInfo) => {
    const { page, limit } = queryInfo;
    let query = { page, limit, bbs_id, is_top };
    return postListApi(query);
  }
);

const handleIsTop = (index) => {
  navigateTo({
    name: "bbs-bbs_id-page",
    params: { ...route.params, page: 1 },
    query: { ...route.query, is_top: index },
  });
  is_top.value = index;
};
</script>
