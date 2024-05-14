<template>
  <div>
    <n-breadcrumb class="m-b-5">
      <n-breadcrumb-item> <NuxtLink to="/">首页</NuxtLink> </n-breadcrumb-item>
      <n-breadcrumb-item> 课程列表</n-breadcrumb-item>
    </n-breadcrumb>

    <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length <= 0">
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
import {
  NGrid,
  NGi,
  NPagination,
  NBreadcrumb,
  NBreadcrumbItem,
} from "naive-ui";
useHead({ title: "课程列表" });
const route = useRoute();
const { page, rows, pageCount, pageSize, pending, error } = await usePage(
  (queryInfo) => {
    const { page, limit } = queryInfo;
    return listApi(route.params.type, { page, limit });
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
