<template>
  <div class="navbar">
    <div class="container-base flex items-center h-60px">
      <n-button class="text-size-xl font-bold" text>丽莎编程</n-button>
      <div class="menu">
        <div
          class="menu-item"
          :class="{ 'menu-item-active': menuIsActive(item) }"
          v-for="item in types"
          :key="item.path"
          @click="handleOpen(item)"
        >
          {{ item.name }}
        </div>
      </div>

      <n-button circle size="small" class="m-l-auto">
        <template #icon>
          <n-icon @click="openSearch"><Search /></n-icon>
        </template>
      </n-button>
      <NuxtLink to="/login" v-if="!user">
        <n-button strong secondary class="m-10px"> 登录 </n-button>
      </NuxtLink>
      <n-dropdown :options="options" v-else>
        <n-avatar
          class="m-10px"
          round
          size="small"
          :src="user.avatar || '/cheng_girl.png'"
          fallback-src="/cheng_girl.png"
        />
      </n-dropdown>
    </div>
  </div>
  <div class="w-100% h-80px"></div>
  <IndexComponentsSearchBar ref="serachBarRef" />
</template>
<script setup>
import { NIcon, NButton, NDropdown, NAvatar } from "naive-ui";
import { Search } from "@vicons/ionicons5";
const user = useUser();
const route = useRoute();
const serachBarRef = ref(null);
const options = [
  {
    label: "用户中心",
    key: "userInfo",
  },
  {
    label: "退出",
    key: "logout",
  },
];
const types = [
  { name: "首页", path: "/", match: [{ name: "index" }] },
  { name: "考试", path: "/paper/1", match: [{ name: "paper-page" }] },
  {
    name: "拼团",
    path: "/list/group/1",
    match: [{ name: "list-type-page", params: { type: "group" } }],
  },
  {
    name: "秒杀",
    path: "/list/flashsale/1",
    match: [{ name: "list-type-page", params: { type: "flashsale" } }],
  },
  {
    name: "直播",
    path: "/list/live/1",
    match: [{ name: "list-type-page", params: { type: "live" } }],
  },
  {
    name: "专栏",
    path: "/list/column/1",
    match: [{ name: "list-type-page", params: { type: "column" } }],
  },
  {
    name: "电子书",
    path: "/list/book/1",
    match: [{ name: "list-type-page", params: { type: "book" } }],
  },
  { name: "社区", path: "/bbs/0/1", match: [{ name: "bbs-type-page" }] },
  {
    name: "课程",
    path: "/list/course/1",
    match: [{ name: "list-type-page", params: { type: "course" } }],
  },
];

const openSearch = () => {
  serachBarRef.value.open();
};
const handleOpen = (pathItem) => {
  const { path } = pathItem;
  navigateTo(path);
};

const menuIsActive = (item) => {
  return item?.match?.find((mItem) => {
    let otherTypeFlag = true;
    if (mItem.params && typeof mItem.params === "object") {
      otherTypeFlag = !!Object.keys(mItem.params).find((key) => {
        return mItem.params[key] == route.params[key];
      });
    }
    return mItem.name === route.name && otherTypeFlag;
  });
};
</script>
<style>
.navbar {
  z-index: 1000;
  @apply bg-white pos-fixed pos-top-none pos-left-none pos-right-none shadow-sm;
}
.menu {
  @apply flex items-center px-4px;
}
.menu-item {
  transition: 0.4s;
  cursor: pointer;
  @apply px-2 py-1 mx-1 rd-4px hover:(bg-blue-50 text-blue-600) active:(bg-blue-100);
}
.menu-item-active {
  @apply text-blue-500 bg-blue-100;
}
</style>
