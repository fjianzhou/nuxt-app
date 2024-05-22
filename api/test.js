export function userSestSaveApi(body) {
  return useHttpPost("userSestSave", "/user_test/save", {
    body,
    $: true,
  });
}

export function testpaperRedApi(query) {
  return useHttpGet("testpaperRed", "/testpaper/read", { query });
}
