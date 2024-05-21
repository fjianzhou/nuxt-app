export function bookMenusListApi(query) {
  return useHttpGet("getBookMenus", "/book/menus", {
    query: query,
  });
}

export function bookDetailApi(query) {
  return useHttpGet("getBookDetail", "book/detail", {
    query: query,
  });
}
