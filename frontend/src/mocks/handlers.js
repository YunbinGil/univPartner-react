import { rest } from 'msw'

// Mock data base
const mockUsers = [
  { userId: 1, loginId: 'hello' },
  { userId: 2, loginId: 'admin' },
]

// [POST] /app/signup
// - body: { loginId, pwd }
// - 400: MISSING_FIELDS
// - 401: DUPLICATE_ID
// - 200: SUCCESS + user { userId, loginId }
export const handlers = [
  rest.post('/api/app/signup', async (req, res, ctx) => {
    const { loginId, pwd } = await req.json()

    if (!loginId || !pwd) {
      return res(
        ctx.status(400),
        ctx.json({ resultCode: 400, message: 'MISSING_FIELDS' })
      )
    }

    const dup = mockUsers.some(u => u.loginId === loginId)
    if (dup) {
      return res(
        ctx.status(401),
        ctx.json({ resultCode: 401, message: 'DUPLICATE_ID' })
      )
    }

    const newUser = { userId: mockUsers.length + 1, loginId }
    mockUsers.push(newUser)

    return res(
      ctx.status(200),
      ctx.json({
        resultCode: 200,
        message: 'SUCCESS',
        user: newUser
      })
    )
  }),

  // [GET] /users/exists?loginId=...
  // - 400: MISSING_ID
  // - 200: SUCCESS + exists: true/false
  rest.get('/users/exists', (req, res, ctx) => {
    const loginId = req.url.searchParams.get('loginId')
    if (!loginId) { // loginId is missing
      return res(
        ctx.status(400),
        ctx.json({ resultCode: 400, message: 'MISSING_QUERY' })
      )
    }  
    if (loginId === 'duplicate'){
      return res(
        ctx.status(200),
        ctx.json({ resultCode: 200, message: 'SUCCESS', exists: true })
      )
    }
    return res(
      ctx.status(200),
      ctx.json({ resultCode: 200, message: 'SUCCESS', exists: false })
    )
  }) 
]

