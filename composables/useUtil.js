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
