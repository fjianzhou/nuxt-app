export function loginApi(body) {
  return useHttpPost("login", "/login", {
    $: true,
    body,
  });
}

export function regUserApi(body) {
  return useHttpPost("login", "/reg", { $: true, body });
}

export function getInfoApi() {
  return useHttpGet("getInfo", "/getinfo", { $: true });
}

export function logoutApi() {
  return useHttpGet("logout", "/logout");
}

export function getCaptchaApi(body) {
  return useHttpPost("getCaptchaApi", "/get_captcha", { body, $: true });
}

export function bindPhoneApi(body) {
  return useHttpPost("bindPhoneApi", "/bind_mobile", { body, $: true });
}

export function forgetApi(body) {
  return useHttpPost("bindPhoneApi", "/forget", { body, $: true });
}

export function searchHistoryListApi(query) {
  return useHttpGet("userHistoryList", "/user_history/list", {
    query: query,
  });
}

export function searchBuyListApi(query) {
  return useHttpGet("userBuyList", "/order/list", {
    query: query,
  });
}

export function searchTestListApi(query) {
  return useHttpGet("userTestList", "/user_test/list", {
    query: query,
  });
}

export function searchPostListApi(query) {
  return useHttpGet("userPostList", "/mypost", {
    query: query,
  });
}

export function searchCouponListApi(query) {
  return useHttpGet("userCouponList", "/user_coupon", {
    query: query,
  });
}

export function searchFavaListApi(query) {
  return useHttpGet("userFavaList", "/user_fava", {
    query: query,
  });
}

export function uncollectApi(body) {
  return useHttpPost("uncollectApi", "/uncollect", { body, $: true });
}
