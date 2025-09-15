import { http, HttpResponse } from 'msw'

// Mock data base
const mockUsers = [
  { userId: 1, loginId: 'hello', pwd: "hello0", nickname: "hello" },
  { userId: 2, loginId: 'admin', nickname: "admin" },
  { userId: 3, loginId: 'editor', nickname: "editor" },
]
function normId(s) { return String(s || '').trim().toLowerCase(); }

export const userHandlers = [


  // [POST] /app/signup
  // - body: { loginId, pwd }
  // - 400: MISSING_FIELDS
  // - 401: DUPLICATE_ID
  // - 200: SUCCESS + user
  http.post('/api/app/signup', async ({ request }) => {
    const { loginId, pwd } = await request.json()
    const id = normId(loginId);

    if (!loginId || !pwd) {
      return HttpResponse.json({ resultCode: 400, message: 'MISSING_FIELDS' }, { status: 400 })
    }

    // 예시: 아이디는 영문/숫자/._- 4~20자
    if (!/^[a-z0-9._-]{4,20}$/.test(id)) {
      return HttpResponse.json({ resultCode: 402, message: 'INVALID_LOGIN_ID' }, { status: 402 });
    }
    if (String(pwd).length < 6) {
      return HttpResponse.json({ resultCode: 403, message: 'WEAK_PASSWORD' }, { status: 403 });
    }

    const dup = mockUsers.some(u => normId(u.loginId) === id)
    if (dup) {
      return HttpResponse.json({ resultCode: 401, message: 'DUPLICATE_ID' }, { status: 401 })
    }

    const newUser = { userId: mockUsers.length + 1, loginId }
    mockUsers.push(newUser)

    return HttpResponse.json({ resultCode: 200, message: 'SUCCESS', user: newUser }, { status: 200 })
  }),

  // [GET] /api/users/exists?loginId=... | ?nickname=...
  // - 400: MISSING_ID
  // - 200: SUCCESS + exists: true/false
  http.get('/api/users/exists', ({ request }) => {
    const { searchParams } = new URL(request.url)
    const loginId = searchParams.get('loginId')
    const nickname = searchParams.get('nickname')


    if (!loginId && !nickname) {
      return HttpResponse.json({ resultCode: 400, message: 'MISSING_QUERY' }, { status: 400 })
    }

    if (loginId != null) {
      const id = normId(loginId);
      const exists = mockUsers.some(u => normId(u.loginId) === id) || id === 'duplicate'
      return HttpResponse.json({ resultCode: 200, message: 'SUCCESS', exists }, { status: 200 })
    }

    if (nickname != null) {
      const name = String(nickname).trim();
      const exists = mockUsers.some(u => u.nickname === name) || name === 'duplicate'
      return HttpResponse.json({ resultCode: 200, message: 'SUCCESS', exists }, { status: 200 })
    }
  }),

  // [POST] /api/signup-detail
  // - body: { nickname, univ, dept, major }
  // - 401: DUPLICATE_NICKNAME
  // - 400: MISSING_FIELDS
  // - 200: SUCCESS
  http.post('/api/app/signup-detail', async ({ request }) => {
    const { nickname, univ, dept, major } = await request.json()
    const userId = localStorage.getItem('signupUserId');

    if (!nickname || !univ || !dept || !major) {
      return HttpResponse.json({ resultCode: 400, message: 'MISSING_FIELDS' }, { status: 400 })
    }
    const exists = mockUsers.some(u => u.nickname === nickname) || nickname === 'duplicate'
    if (exists) {
      return HttpResponse.json({ resultCode: 401, message: 'DUPLICATE_NICKNAME' }, { status: 401 })
    }

    const user = mockUsers.find(u => u.userId === Number(userId));
    if (!user) {
      return HttpResponse.json({ resultCode: 400, message: 'INVALID_USER' }, { status: 400 });
    }
    
    Object.assign(user, { nickname, univ, dept, major });
    return HttpResponse.json({ resultCode: 200, message: 'SUCCESS' }, { status: 200 })
  })
]