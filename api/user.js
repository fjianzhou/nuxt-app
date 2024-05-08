export function loginApi(body) {
  return useHttpPost("login", "/login", {
    body,
  });
}

export function getInfoApi() {
  return useHttpGet("getInfo", "/getinfo", { $: true });
}
