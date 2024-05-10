import { createDiscreteApi } from "naive-ui";
export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");
  const user = useUser() as any;
  let messageObj = null;
  if (process.client) {
    const { message } = createDiscreteApi(["message"]);
    messageObj = message;
  }

  if (!token.value) {
    messageObj && messageObj?.error("请先登录！");
    return navigateTo(`/login?from=${to.fullPath}`);
  }
  const phone = user.value?.phone;
  if (!phone && to.name !== "bindphone") {
    messageObj && messageObj?.error("请先绑定手机号！");
    return navigateTo(`/bindphone?from=${to.fullPath}`);
  }
});
