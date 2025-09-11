import axios from 'axios'
export const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export const api = axios.create({
  baseURL: API_BASE || "/",
  withCredentials: true,
  timeout: 10000,
})

// 요청 인터셉터 (토큰 등)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 응답 인터셉터 (에러 공통처리)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // 여기에 Sentry/Toast/로그 등
    return Promise.reject(err);
  }
);

export default api;