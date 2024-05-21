<template>
  <section class="bg-white shadow rounded p-5 flex items-stretch mb-5">
    <UiImage
      :src="data.cover"
      class="w-108px h-138px rounded flex-shrink-0 bg-gray-50"
    />
    <div class="flex flex-col pl-5 flex-1">
      <h4>{{ data.title }}</h4>
      <div class="mt-auto flex item-end">
        <div class="flex items-end mt-auto">
          <IndexComponentsPrice :value="data.price" />
          <IndexComponentsPrice :value="data.t_price" through class="ml-2" />
        </div>
        <n-button
          strong
          secondary
          round
          type="primary"
          class="m-l-auto"
          @click="open(data.id)"
        >
          {{ data.sub_count === 0 ? "立即订阅" : `${data.sub_count}人订阅` }}
        </n-button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { NButton } from "naive-ui";
const props = defineProps(["data"]);

const open = (id) => {
  navigateTo(`/detail/book/${id}`);
};
</script>
