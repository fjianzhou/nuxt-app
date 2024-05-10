<template>
  <LoadingGroup :pending="pending" :error="error" :isEmpty="isEmpty">
    <div class="p-3">
      <PostList v-for="item in rows" :data="item" :key="item.id" />
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
</template>

<script setup>
import { NGrid, NGi, NPagination } from "naive-ui";
useHead({ title: "我的帖子" });

const route = useRoute();
const type = ref(route.query.tab || "course");
const { page, rows, pageCount, pageSize, pending, error } = await usePage(
  (queryInfo) => {
    return searchPostListApi({ ...queryInfo });
  }
);

const isEmpty = computed(() => rows.value.length <= 0);

const updatePage = (page) => {
  navigateTo({
    params: { ...route.params, page },
    query: { ...route.query, limit: pageSize.value },
  });
};

const updatePageSize = (size) => {
  pageSize.value = size;
  navigateTo({
    params: { ...route.params },
    query: { ...route.query, limit: size },
  });
};
</script>
