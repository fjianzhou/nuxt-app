export const useUser = () => useState("user", () => null);

export async function useRefreshUserInfo() {
  const token = useCookie("token");
  const user = useUser();
  if (token.value) {
    let { data, error } = await getInfoApi();
    console.log(data, error);
    if (data.value) {
      user.value = data.value;
    }
  }
}
