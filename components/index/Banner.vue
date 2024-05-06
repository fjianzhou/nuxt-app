<template>
  <n-carousel :space-between="20" draggable show-arrow class="m-b-10px">
    <img
      v-for="item in data"
      class="carousel-img rounded-6px cursor-pointer"
      :src="item.src"
      @click="$openUrl(item)"
    />
  </n-carousel>
</template>
<script setup>
import { NCarousel } from "naive-ui";
defineProps(["data"]);
</script>

<style lang="scss" scoped>
.carousel-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>
