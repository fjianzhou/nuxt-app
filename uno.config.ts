// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetIcons,
} from "unocss";
import transformerDirectives from "@unocss/transformer-directives";
// 布局的方式我们采用unocss， 特点就是快
export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetAttributify({
      /* preset options */
    }),
    presetUno(),
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      primary: "#1691ef",
    },
  },
});
