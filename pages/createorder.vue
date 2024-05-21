<template>
  <LoadingGroup :pending="pending" :error="error">
    <n-card class="createorder">
      <h4>产品信息</h4>
      <div class="flex mb-5">
        <n-image
          class="rounded flex-shrink-0"
          :class="type == 'book' ? 'w-100px h-140px' : 'w-190px h-108px'"
          :src="data.cover"
        />
        <div class="flex flex-1 ml-4 flex-col">
          <h5 class="flex text-gray-600 text-xl">
            {{ data.title }}
            <IndexComponentsPrice :value="100" class="ml-auto" />
          </h5>
          <div class="mt-auto">
            <n-tag size="medium" :border="false">{{
              typeToText[data.type]
            }}</n-tag>
          </div>
        </div>
      </div>
      <h4>优惠卷</h4>
      <n-grid
        :x-gap="20"
        :cols="4"
        class="mb-4"
        v-if="couponData.rows.length > 0"
      >
        <n-grid-item v-for="item in couponData.rows" :key="item.id">
          <n-button
            strong
            secondary
            :type="user_coupon_id == item.id ? 'warning' : 'tertiary'"
            @click="chooseCoupon(item)"
          >
            ¥{{ item.price }}优惠券
          </n-button>
        </n-grid-item>
      </n-grid>
      <div class="text-gray-400 text-sm mb-5" v-else>暂无优惠卷</div>
      <h4>支付方式</h4>
      <div class="flex mb-5">
        <span class="wxpay">
          <n-icon> <LogoWechat /> </n-icon>
          <b> 微信支付</b>
        </span>
      </div>
      <div class="flex items-center mb-5">
        <small class="text-red-500 mr-auto"> 请在30分钟内完成支付</small>
        <span v-if="user_coupon_id"
          >优惠卷已抵扣<b class="text-red-500">{{ coupon_price }}</b>
          元,需要支付
        </span>
        <IndexComponentsPrice :value="price" />
      </div>
      <div class="flex justify-end">
        <n-button type="primary" :loading="loading" @click="submit">
          确认支付
        </n-button>
      </div>
    </n-card>
  </LoadingGroup>
</template>
<script setup>
import {
  NCard,
  NTag,
  NImage,
  NIcon,
  NButton,
  NGrid,
  NGridItem,
} from "naive-ui";
import { LogoWechat } from "@vicons/ionicons5";
definePageMeta({
  middleware: ["auth", "createorder"],
});
const route = useRoute();
const { id, type } = route.query;
const user_coupon_id = ref(0);
const typeToText = {
  media: "图文",
  video: "视频",
  audio: "音频",
  column: "专栏",
  book: "电子书",
  course: "课程",
};
const { data, error, pending } = await getGoodsInfoApi({
  id,
  type,
});

const { data: couponData } = await getUserCouponApi({ goods_id: id, type });

const chooseCoupon = (item) => {
  if (user_coupon_id.value != item.id) {
    user_coupon_id.value = item.id;
  }
};

const coupon_price = computed(() => {
  if (user_coupon_id.value == 0) {
    return 0;
  }
  let c = couponData.value.rows.find((o) => o.id == user_coupon_id.value);
  return c ? c.price : 0;
});

const price = computed(() => {
  let p = (
    (data.value.price * 1000 - coupon_price.value * 1000) /
    1000
  ).toFixed(2);
  return p <= 0 ? 0 : p;
});

const loading = ref(false);
const submit = async () => {
  loading.value = true;
  let body = {};
  if (["course", "column", "book"].includes(type)) {
    body = {
      goods_id: data.value.id,
      type,
    };
    if (user_coupon_id.value) {
      body.user_coupon_id = user_coupon_id.value;
    }
  } else if (type === "flashsale") {
    body = { flashsale_id: id };
  }
  let { error: createOrderError, data: createOrderData } = await orderSavetApi(
    body,
    type
  );
  loading.value = false;
  if (createOrderError.value) {
    return;
  }
  navigateTo(`/pay?no=${createOrderData.value.no}`, { replace: true });
};
</script>
<style lang="scss" scoped>
.createorder {
  @apply mb-5;
}
.createorder h4 {
  @apply font-semibold mb-3 text-gray-600;
}
.createorder .wxpay {
  @apply flex items-center justify-center border-1px b-solid border-green-500 rounded py-2 
  text-sm text-green-600 w-120px cursor-pointer;
}
</style>
