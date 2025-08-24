import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',            // ← Vite proxy 쓰면 '/', CORS면 'http://localhost:5000/api'
  withCredentials: true,      // 세션 쿠키 포함
})