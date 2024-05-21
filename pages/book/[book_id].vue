<template>
  <LoadingGroup :pending="pending" :error="error">
    <n-grid :x-gap="20">
      <n-grid-item :span="6">
        <n-scrollbar style="height: 450px" class="bg-white rounded shadow mb-5">
          <div class="flex flex-col items-center justify-center">
            <n-image
              :src="data.detail.cover"
              width="60"
              height="80"
              class="rounded shadow my-4"
            />
            <span class="text-sm">{{ data.detail.title }}</span>
          </div>
          <DetailMenu>
            <DetailMenuItem
              v-for="(item, index) in data.menus"
              :item="item"
              :index="index"
              :key="item.id"
              :active="activeId == item.id"
              @click="open(item.id)"
            />
            <Empty v-if="data.menus?.length == 0" desc="暂无目录" />
          </DetailMenu>
        </n-scrollbar>
      </n-grid-item>
      <n-grid-item :span="18">
        <n-card>
          <NuxtPage :page-key="pageKey"></NuxtPage>
        </n-card>
      </n-grid-item>
    </n-grid>
  </LoadingGroup>
</template>
<script setup>
import { NGrid, NGridItem, NCard, NScrollbar, NImage } from "naive-ui";
definePageMeta({
  middleware(to, from) {
    const { book_id } = to.params;
    if (isNaN(+book_id)) {
      return abortNavigation("页面不存在");
    }
    return true;
  },
});

const route = useRoute();
const pageKey = computed(() => route.fullPath);
const { book_id, id } = route.params;
const { data, error, pending } = await bookMenusListApi({ id: book_id });
const activeId = ref(id);

const open = (mId) => {
  activeId.value = mId;
  navigateTo({
    params: {
      ...route.params,
      id: mId,
    },
  });
};
</script>
