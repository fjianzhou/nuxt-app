<template>
  <div class="text-center">{{ toHHmmss(time_out) }}</div>
</template>
<script setup>
const props = defineProps({
  expire: {
    type: Number,
    default: 20,
  },
});
const emit = defineEmits("end");
let timer = null;
const time_out = ref(0);

const toHHmmss = (data) => {
  let s;
  let hours = parseInt((data % (60 * 60 * 24)) / (60 * 60));
  let minutes = parseInt((data % (60 * 60)) / 60);
  let seconds = data % 60;
  const hh = hours < 10 ? "0" + hours : hours;
  const mm = minutes < 10 ? "0" + minutes : minutes;
  const ss = seconds < 10 ? "0" + seconds : seconds;
  return `${hh}:${mm}:${ss}`;
};

onBeforeUnmount(() => {
  clearInterval(timer);
});
onMounted(() => {
  initTimeBox();
});

const handleTimeOut = () => {
  if (time_out.value == 0) {
    emit("end");
    return clearInterval(timer);
  }
  time_out.value--;
};

const initTimeBox = () => {
  if (timer) {
    clearInterval(timer);
  }
  time_out.value = props.expire * 60;
  if (time_out.value > 0) {
    timer = setInterval(handleTimeOut, 1000);
  }
};
</script>
