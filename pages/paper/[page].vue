<template>
  <n-grid :x-gap="20">
    <n-grid-item :span="18">
      <LoadingGroup
        :pending="pending"
        :error="error"
        :isEmpty="rows.length <= 0"
      >
        <TestpaperList v-for="item in rows" :key="item.id" :data="item" />
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
      <HotCourseList />
    </n-grid-item>
  </n-grid>
</template>
<script setup>
import { NButton, NGrid, NGridItem, NPagination } from "naive-ui";
useHead({ title: "考试列表" });
const route = useRoute();

const updatePage = (page) => {
  navigateTo({
    name: "paper-page",
    params: { ...route.params, page },
    query: { ...route.query, limit: pageSize.value },
  });
};

const updatePageSize = (size) => {
  pageSize.value = size;
  navigateTo({
    name: "paper-page",
    params: { ...route.params },
    query: { ...route.query, limit: size },
  });
};

const { page, rows, pageCount, pageSize, pending, error } = await usePage(
  (queryInfo) => {
    const { page, limit } = queryInfo;
    let query = { page, limit };
    return listApi("testpaper", query);
  }
);

const test = () => {
  useHasAuth(() => {
    console.log("已经登录并且绑定了手机号了");
  });
};
</script>
