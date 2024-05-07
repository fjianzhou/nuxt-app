export function searchListApi(query) {
  return useHttpGet("searchList", "/search", {
    query: query,
  });
}
