<template>
  <div class="body">
    <NavBar></NavBar>
    <main class="container-base">
      <slot></slot>
    </main>
    <PageFooter></PageFooter>
  </div>
</template>

<style scoped lang="scss">
.body {
  min-width: 1000px;
  @apply bg-gray-100 flex flex-col min-h-screen;
}
</style>
