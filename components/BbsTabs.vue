<template>
  <UiTab>
    <UiTabItem
      v-for="tabItem in tabs"
      :key="tabItem.id"
      @click="tabClick(tabItem)"
      :active="tabItem.id == bbs_id"
    >
      {{ tabItem.title }}
    </UiTabItem>
  </UiTab>
</template>
<script setup>
const { data } = await bbsTypeListApi();
const route = useRoute();
const bbs_id = ref(route.params.bbs_id || 0);
const tabs = computed(() => {
  return [{ id: 0, title: "全部" }, ...(data.value ? data.value.rows : [])];
});

const tabClick = (tabItem) => {
  navigateTo({
    params: {
      ...route.params,
      page: 1,
      bbs_id: tabItem.id,
    },
    query: {
      ...route.query,
    },
  });
};
</script>
