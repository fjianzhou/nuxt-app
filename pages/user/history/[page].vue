<template>
  <div>
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
    <LoadingGroup :pending="pending" :error="error" :isEmpty="isEmpty">
      <div class="p-3">
        <UserHistoryList :key="item.id" v-for="item in rows" :data="item" />
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
  </div>
</template>

<script setup>
import { NGrid, NGi, NPagination } from "naive-ui";
useHead({ title: "学习记录" });
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
const route = useRoute();
const type = ref(route.query.tab || "course");
const { page, rows, pageCount, pageSize, pending, error } = await usePage(
  (queryInfo) => {
    return searchHistoryListApi({ ...queryInfo, type });
  }
);

const isEmpty = computed(() => rows.value.length <= 0);

const updatePage = (page) => {
  navigateTo({
    params: { ...route.params, page },
    query: { ...route.query, tab: type.value, limit: pageSize.value },
  });
};

const updatePageSize = (size) => {
  pageSize.value = size;
  navigateTo({
    params: { ...route.params },
    query: { ...route.query, tab: type.value, limit: size },
  });
};

const tabClick = (type) => {
  navigateTo({
    params: { page: 1 },
    query: { ...route.query, tab: type, limit: pageSize.value },
  });
};
</script>
