<template>
  <div ref="playerRef"></div>
</template>
<script setup>
import "APlayer/dist/APlayer.min.css";
import APlayer from "APlayer";
const props = defineProps(["title", "cover", "url"]);
const playerRef = ref(null);
let ap = ref(null);
onMounted(() => {
  ap.value = new APlayer({
    container: playerRef.value,
    audio: [
      {
        name: props.title,
        artist: "丽莎编程",
        url: props.url,
        cover: props.cover,
      },
    ],
  });
});
onBeforeUnmount(() => {
  ap.value.destroy();
});
</script>
