<template>
  <div ref="videRef"></div>
</template>
<script setup>
const videRef = ref(null);
const videPlayer = ref(null);
const props = defineProps(["url"]);

// declare class Player {
//   constructor(options: any);
//   destroy: () => {};
// }

useHead({
  script: [
    {
      src: "//unpkg.byted-static.com/xgplayer/2.31.2/browser/index.js",
    },
  ],
});
onMounted(() => {
  // @ts-ignore
  videPlayer.value = new Player({
    el: videRef.value,
    url: props.url,
    width: null,
    height: 450,
    playsinline: true,
  });
});

onBeforeUnmount(() => {
  // @ts-ignore
  videPlayer?.value?.destroy();
});
</script>
