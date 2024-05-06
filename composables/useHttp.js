const fetchConfig = {
  baseURL: "http://demonuxtapi.dishait.cn/pc",
  headers: { appid: "bd9d01ecc75dbbaaefce" },
};

function useGetFetchOptions(options = {}) {
  options.baseURL = options.baseURL ?? fetchConfig.baseURL;
  options.headers = options.headers ?? {
    appid: fetchConfig.headers.appid,
  };
  options.lazy = options.lazy ?? true;
  return options;
}

export async function useHttp(key, url, options = {}) {
  options = useGetFetchOptions(options);
  options.key = key;
  const result = await useFetch(url, {
    transform: (data) => {
      return data.data;
    },
    ...options,
  });
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
