import axios from "axios";

const api = axios.create({
  baseURL: "https://isaii-backend.vercel.app/api"|| "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

if (import.meta.env.DEV) {
  api.interceptors.request.use((config) => {
    try {
      const safeData =
        config.data instanceof FormData ? "[FormData]" : config.data;
      console.debug(
        "[api] request",
        config.method?.toUpperCase(),
        config.url,
        safeData
      );
    } catch (e) {}
    return config;
  });

  api.interceptors.response.use(
    (res) => {
      try {
        console.debug("[api] response", res.config.url, res.status, res.data);
      } catch (e) {}
      return res;
    },
    (err) => {
      try {
        console.error(
          "[api] response error",
          err.config?.url,
          err.response?.status,
          err.response?.data ?? err.message
        );
      } catch (e) {}
      return Promise.reject(err);
    }
  );
}

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
