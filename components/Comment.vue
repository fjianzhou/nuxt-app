<template>
  <div>
    <div class="px-5 pb-5">
      <h4>精彩评论</h4>
    </div>
    <LoadingGroup :pending="pending" :error="error" :isEmpty="rows.length <= 0">
      <CommentList
        v-for="item in rows"
        :key="item.id"
        :data="item"
        @commentSuccess="refresh"
      />
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
import { NPagination } from "naive-ui";

const props = defineProps(["post_id"]);
const page = ref(1);
const pageSize = ref(10);
const route = useRoute();

const { rows, pageCount, pending, error, refresh } = await usePage(
  (queryInfo) => {
    let query = { page, limit: pageSize, post_id: props.post_id };
    return postCommentApi(query);
  }
);

const updatePage = (pageIndex) => {
  page.value = pageIndex;
  refresh();
};

const updatePageSize = (size) => {
  pageSize.value = size;
};

defineExpose({
  updatePage,
});
</script>
