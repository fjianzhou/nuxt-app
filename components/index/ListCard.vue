<template>
  <div>
    <div class="flex mb-3">
      <span class="text-lg">{{ title }}</span>
      <n-button quaternary class="ml-auto">查看更多</n-button>
    </div>
    <n-grid x-gap="12" :cols="4" class="mb-6">
      <n-gi v-for="item in pdata">
        <IndexComponentsCardList :data="item" />
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup>
import { NButton, NGrid, NGi } from "naive-ui";
const da = defineProps(["data", "title", "type"]);
const pdata = ref(da.data || []);
if (da.type === "group") {
  const { data, pending, error } = await indexGroupDataApi({
    page: 1,
    usable: 1,
    limit: 10,
  });
  pdata.value = data.value;
}
</script>
