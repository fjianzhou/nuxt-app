<template>
  <n-empty :description="desc" size="large" class="py-10"> </n-empty>
</template>
<script setup>
import { NEmpty } from "naive-ui";
defineProps(["desc"]);
</script>
