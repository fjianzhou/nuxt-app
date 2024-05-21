<template>
  <div class="active-bar" v-show="!isEnd">
    <div class="top">
      <span>
        {{
          type === "group"
            ? `${data.group.p_num}人拼团`
            : `${data.flashsale?.used_num}人已抢/剩${data.flashsale?.s_num}`
        }}
      </span>
      <span class="flex items-center">
        倒计时：
        <IndexComponentsCountDown
          :time="data[type].end_time"
          @end="isEnd = true"
        />
      </span>
    </div>
    <div class="bottom">
      <IndexComponentsPrice :value="data[type].price" />
      <IndexComponentsPrice
        :value="data.price"
        through
        class="text-subtitle-2 ml-1"
      />
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["data"]);
const type = computed(() => (props.data.group ? "group" : "flashsale"));
const isEnd = ref(false);
</script>

<style lang="scss">
.active-bar {
  @apply w-350px;
  .top {
    @apply bg-red-500 text-white flex justify-between text-xs px-3 py-2;
  }
  .bottom {
    @apply px-3 py-2 border-1 border-style-solid border-red-500;
    .text-subtitle-2 {
    }
  }
}
</style>
