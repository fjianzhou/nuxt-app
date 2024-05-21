<template>
  <div class="flex justify-center">
    <n-image
      :src="src"
      class="border-style-solid border-1 b-#e5e7eb"
      :width="280"
      :height="280"
    />
  </div>
</template>
<script setup>
import { NImage } from "naive-ui";
import QRCode from "qrcode";
const props = defineProps(["data"]);
const src = ref(null);
QRCode.toDataURL(props.data, { width: 280, height: 280 }).then((url) => {
  src.value = url;
  console.log(url);
});
</script>
