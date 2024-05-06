<template>
  <div>bbs {{ $route.params.type }} - {{ $route.params.page }}</div>
</template>
<script setup>
useHead({ title: "社区问答" });
const route = useRoute();
</script>
