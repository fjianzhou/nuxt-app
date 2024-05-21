export function useEnterEvent(event) {
  function handleEnterEvent(e) {
    if (e.key === "Enter") {
      event();
      e.preventDefault();
    }
  }

  onBeforeMount(() => document.addEventListener("keydown", handleEnterEvent));
  onUnmounted(() => document.removeEventListener("keydown", handleEnterEvent));
}

export function useTimeStatus(start, end) {
  start = new Date(start);
  end = new Date(end);
  const now = Date.now();
  let status = "";
  if (start < now && now < end) {
    status = "ing";
  } else if (start >= now) {
    status = "pending";
  } else {
    status = "pending";
  }
  return status;
}
