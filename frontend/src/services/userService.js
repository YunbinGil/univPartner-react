//userService.js

import { api, API_BASE } from '../lib/api'

// [POST] /api/app/signup
// body: { loginId, pwd }
// res : { resultCode, message, user? }
export async function signup({ loginId, pwd }) {
  const res = await api.post('/api/app/signup', { loginId, pwd })
  return res.data
}

// [GET] /api/users/exists?loginId=... 또는 ?nickname=...
// res : { resultCode, message, exists }
export async function checkExists(value, target = 'loginId') {
  const key = target === 'nickname' ? 'nickname' : 'loginId'
  const q = (value ?? '').trim();
  const res = await api.get('/api/users/exists', { params: { [key]: q } });
  return res.data
}


// [POST] /api/app/signup-detail
// body: { nickname, univ, dept, major }
// res : { resultCode, message }
export async function signupDetail({ nickname, univ, dept, major }) {
  const res = await api.post('/api/app/signup-detail', {
    nickname, univ, dept, major,
  })
  return res.data
}