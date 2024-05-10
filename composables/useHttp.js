import { createDiscreteApi } from "naive-ui";

const fetchConfig = {
  baseURL: "http://demonuxtapi.dishait.cn/pc",
  headers: { appid: "bd9d01ecc75dbbaaefce" },
};

function useGetFetchOptions(options = {}) {
  options.baseURL = options.baseURL ?? fetchConfig.baseURL;
  options.headers = options.headers ?? {
    appid: fetchConfig.headers.appid,
  };
  options.lazy = options.lazy ?? false;

  const token = useCookie("token");
  if (token.value) {
    options.headers.token = token.value;
  }
  return options;
}

export async function useHttp(key, url, options = {}) {
  options = useGetFetchOptions(options);
  options.key = key;
  if (options.$) {
    const data = ref(null);
    const error = ref(null);
    return await $fetch(url, options)
      .then((res) => {
        data.value = res.data;
        return {
          data,
          error,
        };
      })
      .catch((err) => {
        const msg = err?.data?.data;
        if (process.client) {
          const { message } = createDiscreteApi(["message"]);
          message.error(msg || "服务端错误");
        }
        error.value = msg;
        return {
          data,
          error,
        };
      });
  }
  const result = await useFetch(url, {
    transform: (data) => {
      return data.data;
    },
    ...options,
  });
  if (process.client && result.error.value) {
    const msg = result.error.value.data.data;
    if (!options.lazy) {
      const { message } = createDiscreteApi(["message"]);
      message.error(msg || "服务端错误");
    }
  }
  return result;
}

export async function useHttpGet(key, url, options = {}) {
  options.method = "GET";
  return await useHttp(key, url, options);
}

export async function useHttpPost(key, url, options = {}) {
  options.method = "POST";
  return await useHttp(key, url, options);
}
