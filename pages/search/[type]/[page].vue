<template>
  <div>
    <h5 class="text-lg my-10px">“{{ keyword }}”的搜索结果</h5>
    <UiTab>
      <UiTabItem
        :active="item.value === type"
        v-for="item in tab"
        :key="item.value"
        @click="tabClick(item.value)"
      >
        {{ item.label }}
      </UiTabItem>
    </UiTab>
    <LoadingGroup :pending="pending" :error="error">
      <template #loading>
        <LoadingCourseSkeleton />
      </template>
      <n-grid :x-gap="20" :y-gap="5" :cols="4">
        <n-gi v-for="item in rows" :key="item.id">
          <IndexComponentsCardList :data="item"></IndexComponentsCardList>
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
import { NGrid, NGi, NPagination } from "naive-ui";
definePageMeta({
  middleware: ["search"],
});
const tab = [
  {
    label: "课程",
    value: "course",
  },
  {
    label: "专栏",
    value: "column",
  },
];
const { keyword, type, page, rows, pageCount, pageSize, pending, error } =
  await usePage((queryInfo) => {
    return searchListApi(queryInfo);
  });
useHead({ title: keyword.value });
const route = useRoute();

const updatePage = (page) => {
  navigateTo({
    name: "search-type-page",
    params: { ...route.params, page },
    query: { ...route.query, limit: pageSize.value },
  });
};

const updatePageSize = (size) => {
  pageSize.value = size;
  navigateTo({
    name: "search-type-page",
    params: { ...route.params },
    query: { ...route.query, limit: size },
  });
};

const tabClick = (type) => {
  navigateTo({
    name: "search-type-page",
    params: { type, page: 1 },
    query: { ...route.query, limit: pageSize.value },
  });
};
</script>
