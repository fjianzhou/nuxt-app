<template>
  <div>
    考试列表
    {{ $route.params.page }}
    <n-button @click="test">测试</n-button>
  </div>
</template>
<script setup>
import { NButton } from "naive-ui";
useHead({ title: "考试列表" });
const route = useRoute();
const test = () => {
  useHasAuth(() => {
    console.log("已经登录并且绑定了手机号了");
  });
};
</script>
