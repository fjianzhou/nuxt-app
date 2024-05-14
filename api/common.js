export function searchListApi(query) {
  return useHttpGet("searchList", "/search", {
    query: query,
  });
}

export function couponListApi(query) {
  return useHttpGet("couponList", "/coupon/list", {
    query: query,
  });
}

export function listApi(type, query) {
  return useHttpGet(`${type}List`, `/${type}/list`, {
    query: query,
  });
}
