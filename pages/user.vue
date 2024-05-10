<template>
  <n-grid :x-gap="20">
    <n-grid-item :span="5">
      <ul class="conter-menu">
        <li
          :class="{ active: item.name === activeName }"
          v-for="item in menus"
          @click="navigate(item)"
        >
          {{ item.title }}
        </li>
      </ul>
    </n-grid-item>
    <n-grid-item :span="19">
      <div class="bg-white rounded mb-10 min-h-75vh">
        <NuxtPage :page-key="pageKey"></NuxtPage>
      </div>
    </n-grid-item>
  </n-grid>
</template>
<script setup>
import { NGrid, NGridItem } from "naive-ui";
const route = useRoute();
const pageKey = computed(() => route.fullPath);
const activeName = ref("user-history-page");
definePageMeta({
  middleware: ["auth"],
});

const menus = [
  { title: "学习记录", name: "user-history-page" },
  { title: "购买记录", name: "user-buy-page" },
  { title: "我的考试", name: "user-test-page" },
  { title: "我的帖子", name: "user-post-page" },
  { title: "优惠卷记录", name: "" },
  { title: "我的收藏", name: "" },
  { title: "修改资料", name: "" },
  { title: "修改密码", name: "" },
  { title: "其他设置 ", name: "" },
];

const navigate = (item) => {
  activeName.value = item.name;
  navigateTo({
    name: item.name,
    params: {
      page: 1,
    },
  });
};
</script>

<style lang="scss">
.conter-menu {
  @apply list-none bg-white rounded;
  & > li {
    @apply px-5 py-3  cursor-pointer hover:(bg-blue-50);
  }
  .active {
    @apply font-bold text-blue-500 bg-gray-200;
  }
}
</style>
