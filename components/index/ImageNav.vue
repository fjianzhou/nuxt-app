<template>
  <n-grid x-gap="12" :cols="4" :y-gap="8">
    <n-gi v-for="item in data">
      <n-card @click="$openUrl(item)">
        <template #cover>
          <img :src="item.src" />
        </template>
        <div class="text-center">{{ item.name }}</div>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { NGrid, NGi, NCard } from "naive-ui";

defineProps(["data"]);
</script>

<style lang="scss" scoped></style>
