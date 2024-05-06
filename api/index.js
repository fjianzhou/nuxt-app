export function indexDataApi() {
  return useHttpGet("indexData", "/index");
}

export function indexGroupDataApi(query) {
  return useHttpGet("listData", "/group/list", {
    query,
    transform: (data) => {
      return data.data?.rows ?? [];
    },
  });
}
