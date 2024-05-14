<template>
  <section class="bg-white shadow rounded mb-5">
    <div class="p-3 border-b">
      <h4>精品推荐</h4>
    </div>
    <div class="p-3">
      <IndexComponentsCardList
        v-for="item in data"
        :key="item.id"
        :data="item"
      />
    </div>
  </section>
</template>
<script setup>
let { data } = await getHottCourseListApi();
</script>
