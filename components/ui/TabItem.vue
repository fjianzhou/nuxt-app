<template>
  <span class="tab-item" :class="{ 'tab-item-active': active }">
    <slot></slot>
  </span>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss">
.tab-item {
  @apply py-3 px-4 text-gray-700 text-sm cursor-pointer flex-shrink-0;
}
.tab-item:hover {
  @apply text-blue-400;
}
.tab-item-active {
  @apply text-blue-400  b-b-2px b-b-solid b-blue-400;
}
</style>
