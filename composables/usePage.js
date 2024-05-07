export async function usePage(getDateApiCallback) {
  const route = useRoute();
  const keyword = ref(route.query.keyword);
  const pageSize = ref(parseInt(route.query?.limit ?? 12));
  const type = ref(route.params.type);
  const page = ref(parseInt(route.params.page));

  const { data, pending, error } = await getDateApiCallback({
    type,
    page,
    keyword,
    limit: pageSize,
  });

  const rows = computed(() => data.value?.rows ?? []);
  const pageCount = computed(() => data.value?.count ?? 0);

  watch(
    () => route.query.keyword,
    (value) => {
      keyword.value = value;
    }
  );

  return { keyword, pageSize, type, page, rows, pageCount, pending, error };
}
