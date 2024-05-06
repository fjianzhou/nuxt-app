import { createDiscreteApi } from "naive-ui";
import type { LoadingBarInst } from "naive-ui/es/loading-bar/src/LoadingBarProvider";

export default defineNuxtPlugin((nuxtApp) => {
  const bar = ref<LoadingBarInst | null>(null);
  //在vue应用程序初始化并在浏览器中挂载时调用
  nuxtApp.hook("app:mounted", () => {
    if (bar.value) {
      return;
    }
    const { loadingBar } = createDiscreteApi(["loadingBar"]);
    bar.value = loadingBar;
  });
  nuxtApp.hook("page:start", () => {
    bar.value?.start();
  });
  nuxtApp.hook("page:finish", () => {
    bar.value?.finish();
  });
  nuxtApp.hook("app:error", () => {
    if (process.client) {
      bar.value?.finish();
    }
  });
});
