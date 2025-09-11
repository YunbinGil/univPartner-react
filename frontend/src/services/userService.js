//userService.js

import { api, API_BASE  } from '../lib/api'

// 🧪 프런트 전용 인메모리 목업 DB (런타임 동안만 유지)
const mockDB = {
  users: new Set(), // loginId 저장
  nextId: 1,
};

// [POST] /app/signup
// payload: { loginId, pwd }
// return: { resultCode, message, user? }
export async function signup({ loginId, pwd }) {
    if (!API_BASE) {
    if (mockDB.users.has(loginId)) {
      return { resultCode: 409, message: "DUPLICATE_ID" };
    }
    mockDB.users.add(loginId);
    const user = { userId: mockDB.nextId++, loginId };
    return { resultCode: 200, message: "OK", user };
  }
  const res = await api.post(`/signup`, {
    loginID: loginId,
    password: pwd,
  });
  return res.data;
  
}

// [POST] [GET] /app/signup
// payload: { loginId }
// return: { resultCode, message, exists?}
export async function checkExists(payload) {
  if (!API_BASE) {
    return { exists: mockDB.users.has(payload) };
  }
  const res = await api.get(`/check-id?loginID=${encodeURIComponent(payload)}`);
  return res.data;
}