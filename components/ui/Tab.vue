<template>
  <div class="tab">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.tab {
  @apply w-full flex overflow-x-auto bg-white mb-4 rounded;
}
</style>
