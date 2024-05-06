export default defineNuxtPlugin((nuxt) => {
  const router = useRouter();
  nuxt.provide("openUrl", (item: any) => {
    const { type, url } = item;
    if (type === "webview") {
      window.open(url);
    } else if (type === "course") {
      const { course_id } = item;
      navigateTo(`/detail/course/${course_id}`);
    }
  });
});
