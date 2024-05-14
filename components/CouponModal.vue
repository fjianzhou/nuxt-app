<template>
  <ClientOnly>
    <n-popover :width="450" trigger="click" placement="right">
      <template #trigger>
        <n-button strong secondary type="warning" size="tiny">
          领取优惠卷
        </n-button>
      </template>
      <div class="p-2">
        <h4 class="text-lg font-bold mb-3">领取优惠卷({{ data.length }})</h4>
        <n-scrollbar style="height: 300px">
          <CouponList v-for="item in data" :data="item" />
        </n-scrollbar>
      </div>
    </n-popover>
  </ClientOnly>
</template>
<script setup>
import { NPopover, NScrollbar, NButton } from "naive-ui";

const { data } = await couponListApi();
</script>
