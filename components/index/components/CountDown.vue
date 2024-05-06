<template>
  <div class="count-down">
    <small>{{ date.days }}</small>
    天:
    <small>{{ date.hours }}</small>
    :
    <small>{{ date.minutes }}</small>
    :
    <small>{{ date.seconds }}</small>
  </div>
</template>
<script setup>
const props = defineProps(["time"]);
const emit = defineEmits(["start", "end"]);

const date = useCountDown(props.time);

function useCountDown(end_time) {
  const timeOut = ref(0);
  const timerId = ref(0);
  onMounted(() => {
    if (typeof end_time === "string") {
      end_time = new Date(end_time).getTime();
    }
    timeOut.value = (end_time - Date.now()) / 1000;
    if (timeOut.value <= 0) {
      return emit("end");
    }
    timerId.value = setInterval(() => {
      timeOut.value--;
      if (timeOut.value <= 0) {
        close();
        emit("end");
      }
    }, 1000);
  });

  function close() {
    if (timerId.value) {
      clearInterval(timerId.value);
    }
  }
  const d = computed(() => formatDiffDate(timeOut.value));
  return d;
}

function formatDiffDate(seconds) {
  let time = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (seconds > 0) {
    time.days = Math.floor(seconds / (60 * 60 * 24));
    time.hours = Math.floor(seconds / (60 * 60)) - time.days * 24;
    time.minutes =
      Math.floor(seconds / 60) - time.days * 24 * 60 - time.hours * 60;
    time.seconds =
      Math.floor(seconds) -
      time.days * 24 * 60 * 60 -
      time.hours * 60 * 60 -
      time.minutes * 60;
  }
  time.days = time.days < 10 ? `0${time.days}` : time.days;
  time.hours = time.hours < 10 ? `0${time.hours}` : time.hours;
  time.minutes = time.minutes < 10 ? `0${time.minutes}` : time.minutes;
  time.seconds = time.seconds < 10 ? `0${time.seconds}` : time.seconds;
  return time;
}
</script>

<style>
.count-down small {
  background-color: #ffffff;
  border-radius: 2px;
  padding: 2px 3px;
  margin: 0 3px;
  @apply text-yellow-500;
}
</style>
