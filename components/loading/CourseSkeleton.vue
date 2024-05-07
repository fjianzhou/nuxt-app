<template>
  <n-grid x-gap="12" y-gap="20" :cols="4">
    <n-gi v-for="index in 8">
      <n-card class="m-b-20px">
        <template #cover>
          <n-skeleton height="150px" width="100%" />
        </template>
        <n-skeleton height="30px" width="50%" class="my-2" />
        <n-skeleton text style="width: 60%" />
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { NGi, NGrid, NSkeleton, NGridItem, NCard } from "naive-ui";
</script>
