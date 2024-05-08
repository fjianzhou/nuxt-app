export function indexDataApi() {
  return useHttpGet("indexData", "/index", { lazy: true });
}

export function indexGroupDataApi(query) {
  return useHttpGet("listData", "/group/list", {
    lazy: true,
    query,
    transform: (data) => {
      return data.data?.rows ?? [];
    },
  });
}
