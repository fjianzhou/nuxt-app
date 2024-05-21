export function getGoodsInfoApi(query) {
  return useHttpGet("getGoodsInfo", "/goods/read", { query, $: true });
}

export function getUserCouponApi(query) {
  return useHttpGet("getUserCoupon", "user_coupon", { query, $: true });
}

export function orderSavetApi(body, type = "") {
  let url = "/order/save";
  if (type === "flashsale") {
    url = "/order/flashsale";
  }
  if (type === "group") {
    url = "/order/group";
  }
  return useHttpPost("orderSave", url, { body, $: true });
}

export function orderWxpayApi(body) {
  return useHttpPost("orderWxpay", "/order/wxpay", { body });
}

export function getWXpayStatusApi(body) {
  return useHttpPost("getWXpayStatus", "/order/iswxpay", { body, $: true });
}

export function getGroupWorkList(query) {
  return useHttpGet("getGroupWorkList", "/group_work/list", { query, $: true });
}
