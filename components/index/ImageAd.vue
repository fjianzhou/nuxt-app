<template>
  <img
    v-for="item in data"
    :src="item.src"
    @click="openUrl(item)"
    class="w-100% h-100px rounded mb-6 cursor-pointer"
  />
</template>

<script setup>
defineProps(["data"]);
const nuxtApp = useNuxtApp();
const openUrl = (item) => {
  nuxtApp.$openUrl(item);
};
</script>
