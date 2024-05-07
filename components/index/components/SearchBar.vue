<template>
  <n-drawer
    v-model:show="active"
    placement="top"
    height="200px"
    @after-enter="addKeydownEvent"
    @after-leave="removeKeydownEvent"
  >
    <div class="h-full flex justify-center items-center">
      <n-input-group :style="{ width: '500px' }">
        <n-input
          size="large"
          v-model:value="keyWord"
          placeholder="请输入关键词"
        />
        <n-button
          type="primary"
          size="large"
          ghost
          @click="searchHanlder"
          :disabled="!keyWord"
        >
          搜索
        </n-button>
      </n-input-group>
    </div>
  </n-drawer>
</template>
<script setup>
import { NDrawer, NInputGroup, NInput, NButton } from "naive-ui";
const active = ref(false);
const keyWord = ref("");

const searchHanlder = () => {
  navigateTo({
    name: "search-type-page",
    params: {
      type: "course",
      page: 1,
    },
    query: { keyword: keyWord.value },
  });
  close();
};

const handleEnterEvent = (e) => {
  if (e.key === "Enter" && keyWord.value) {
    searchHanlder();
  }
};

const addKeydownEvent = () => {
  document.addEventListener("keydown", handleEnterEvent);
};

const removeKeydownEvent = () => {
  document.removeEventListener("keydown", handleEnterEvent);
};

const open = () => {
  keyWord.value = "";
  active.value = true;
};
const close = () => {
  active.value = false;
};
defineExpose({ open, close });
</script>
