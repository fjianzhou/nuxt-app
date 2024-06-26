import { createDiscreteApi } from "naive-ui";
export const useUser = () => useState("user", () => null);

export async function useRefreshUserInfo() {
  const token = useCookie("token");
  const user = useUser();
  if (token.value) {
    let { data, error } = await getInfoApi();
    if (data.value) {
      user.value = data.value;
    }
  }
}

export async function userLogout() {
  await logoutApi();
  const user = useUser();
  user.value = null;
  const cookie = useCookie("token");
  cookie.value = null;
  const { message } = createDiscreteApi(["message"]);
  message.success("退出登录成功！");
  const route = useRoute();
  if (route.path !== "/") {
    navigateTo("/", {
      replace: true,
    });
  }
}

export function useHasAuth(callback = null) {
  const token = useCookie("token");
  const user = useUser();
  const route = useRoute();
  const { message } = createDiscreteApi(["message"]);
  if (!token.value) {
    message.error("请先登录！");
    return navigateTo(`/login?from=${route.fullPath}`);
  }
  const phone = user.value?.phone;
  if (!phone && route.name !== "bindphone") {
    message.error("请先绑定手机号！");
    return navigateTo(`/bindphone?from=${route.fullPath}`);
  }
  if (callback && typeof callback === "function") {
    callback();
  }
}

export function useHandleSupportPost() {
  const supportLoading = ref(false);
  const handleSupport = (item) => {
    useHasAuth(async () => {
      let type = item.issupport ? "unsupport" : "support";
      let msg = item.issupport ? "取消点赞" : "点赞";
      supportLoading.value = true;
      const { error } = await postSupportApi(item.id, type);
      if (error.value) return;
      if (type === "unsupport") {
        item.support_count--;
      } else {
        item.support_count++;
      }
      item.issupport = !item.issupport;
      const { message } = createDiscreteApi(["message"]);
      message.success(`${msg}成功`);
      supportLoading.value = false;
    });
  };
  return { supportLoading, handleSupport };
}
