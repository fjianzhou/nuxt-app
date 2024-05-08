<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-center">
    <div class="shadow-lg rounded-lg bg-white p-30px">
      <h4 class="p-b-4 text-xl text-gray-500">
        {{ $route.meta.title || "登录" }}
      </h4>
      <slot />
    </div>
  </div>
</template>
