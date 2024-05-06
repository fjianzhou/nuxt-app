<template>
  <div>公共列表 {{ $route.params.type }} - {{ $route.params.page }}</div>
</template>
<script setup>
useHead({ title: "考试列表" });
const route = useRoute();
</script>
