export async function usePage(getDateApiCallback) {
  const route = useRoute();
  const keyword = ref(route.query.keyword);
  const pageSize = ref(parseInt(route.query?.limit ?? 10));
  const type = ref(route.params.type);
  const page = ref(parseInt(route.params.page));
  const { data, pending, error, refresh } = await getDateApiCallback({
    type,
    page,
    keyword,
    limit: pageSize,
  });

  const rows = computed(() => data.value?.rows ?? []);
  const pageCount = computed(() => {
    let count = data.value?.count % pageSize.value;
    let size = Math.floor(data.value?.count / pageSize.value);
    return count === 0 ? size : size + 1;
  });

  watch(
    () => route.query.keyword,
    (value) => {
      keyword.value = value;
    }
  );

  return {
    keyword,
    pageSize,
    type,
    page,
    rows,
    pageCount,
    pending,
    error,
    refresh,
  };
}
