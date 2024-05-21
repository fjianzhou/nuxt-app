const typeToText = {
  flashsale: "秒杀",
  live: "直播",
  column: "专栏",
  book: "电子书",
  group: "拼团",
  course: "课程",
};

export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to);
  const { id, type } = to.query;
  console.log(type, id, Object.keys(typeToText).includes(type));
  if (Object.keys(typeToText).includes(type) && !isNaN(+id)) {
    useHead({ title: "创建订单" });
    return true;
  }
  return abortNavigation("页面不存在");
});
