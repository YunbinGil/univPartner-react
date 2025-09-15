//userService.js

import { api, API_BASE } from '../lib/api'

// 🧪 프런트 전용 인메모리 목업 DB (런타임 동안만 유지)
const mockDB = {
  users: new Set(), // users 저장
  nextId: 1,
};

// [POST] /app/signup
// payload: { loginId, pwd }
// return: { resultCode, message, user? }
export async function signup({ loginId, pwd }) {
  if (!API_BASE) {
    if (checkExists(loginId, "loginId").exists) {
      return { resultCode: 401, message: "DUPLICATE_ID" };
    }
    if (!loginId || !pwd) {
      return { resultCode: 400, message: "MISSING_FIELDS" };
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
export async function checkExists(payload, target) {
  if (!API_BASE) {
    return { exists: false }; // 예시로 항상 false 반환
  }
  const res = await api.get(`/exists?${target}=${encodeURIComponent(payload)}`);
  return res.data;
}


// [POST] [GET] /app/signup
// payload: { loginId }
// return: { resultCode, message, exists?}
