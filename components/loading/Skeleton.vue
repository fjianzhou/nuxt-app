<template>
  <n-card v-for="index in 3" class="m-b-20px">
    <n-skeleton text :repeat="2" />
    <n-skeleton text style="width: 60%" />
    <n-skeleton text :repeat="3" />
  </n-card>
</template>
<script setup>
import { NCard, NSkeleton } from "naive-ui";
</script>
