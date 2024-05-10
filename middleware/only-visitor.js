import { createDiscreteApi } from "naive-ui";
export default defineNuxtRouteMiddleware(() => {
  const token = useCookie("token");
  if (token.value) {
    if (process.client) {
      const { message } = createDiscreteApi(["message"]);
      message.error("请勿重新登录");
    }
    return "/";
  }
});
