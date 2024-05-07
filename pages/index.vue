<template>
  <LoadingGroup :pending="pending" :error="error">
    <template v-for="item in data" :key="item.type" class="m-b-20px">
      <IndexBanner v-if="item.type === 'swiper'" :data="item.data" />
      <IndexImageNav v-else-if="item.type === 'icons'" :data="item.data" />
      <IndexImageAd v-else-if="item.type === 'imageAd'" :data="item.data" />
      <IndexListCard
        v-else-if="item.type === 'promotion'"
        :data="item.data"
        :title="item.title"
        :type="item.listType"
      />
      <IndexListCard
        v-else-if="item.type === 'list'"
        :data="item.data"
        :title="item.title"
      />
    </template>
  </LoadingGroup>
</template>
<script setup>
useHead({ title: "首页" });
const { data, pending, error } = await indexDataApi();
</script>
