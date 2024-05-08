export default defineNuxtRouteMiddleware(async (to, form) => {
  await useRefreshUserInfo();
});
