<template>
  <div>
    <n-breadcrumb class="m-b-5">
      <n-breadcrumb-item> <NuxtLink to="/">首页</NuxtLink> </n-breadcrumb-item>
      <n-breadcrumb-item> 课程列表</n-breadcrumb-item>
    </n-breadcrumb>

    <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length <= 0">
      <template #loading>
        <LoadingBookSkeleton v-if="route.params.type === 'book'" />
        <LoadingCourseSkeleton v-else />
      </template>
      <n-grid
        :x-gap="20"
        :y-gap="5"
        :cols="route.params.type === 'book' ? 2 : 4"
      >
        <n-gi v-for="item in rows" :key="item.id">
          <Booklist :data="item" v-if="route.params.type === 'book'" />
          <IndexComponentsCardList v-else :data="item" />
        </n-gi>
      </n-grid>
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
  </div>
</template>
<script setup>
import {
  NGrid,
  NGi,
  NPagination,
  NBreadcrumb,
  NBreadcrumbItem,
} from "naive-ui";
useHead({
  title: "课程列表",
  script: [
    {
      src: "//unpkg.byted-static.com/xgplayer/2.31.2/browser/index.js",
    },
  ],
});
const route = useRoute();
const { page, rows, pageCount, pageSize, pending, error } = await usePage(
  (queryInfo) => {
    const { page, limit } = queryInfo;
    let query = { page, limit };
    if (["group", "flashsale"].includes(route.params.type)) {
      query.usable = 1;
    }
    return listApi(route.params.type, query);
  }
);

const updatePage = (page) => {
  navigateTo({
    name: "list-type-page",
    params: { ...route.params, page },
    query: { ...route.query, limit: pageSize.value },
  });
};

const updatePageSize = (size) => {
  pageSize.value = size;
  navigateTo({
    name: "list-type-page",
    params: { ...route.params },
    query: { ...route.query, limit: size },
  });
};
</script>
