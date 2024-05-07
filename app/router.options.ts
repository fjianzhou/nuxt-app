import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  scrollBehavior: (to, from, savePostion) => {
    // 在按下 前进/后退 按钮时
    if (savePostion) {
      return savePostion;
    }
    return {
      top: 0,
    };
  },
};
