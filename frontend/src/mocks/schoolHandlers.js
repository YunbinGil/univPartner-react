// src/mocks/schoolHandlers.js
import { http, HttpResponse } from 'msw'

const UNIVS = ['건국대학교', 'UMKC']
const DEPTS = {
    '건국대학교': ['공과대학', '문과대학'],
    'UMKC': ['School of Engineering', 'School of Arts']
}
const MAJORS = {
    '건국대학교|공과대학': ['컴퓨터공학부', '전기전자공학부'],
    'UMKC|School of Engineering': ['Computer Science', 'IT'],
}

export const schoolHandlers = [
    http.get('/api/univ-list', ({ request }) => {
        return HttpResponse.json(UNIVS, { status: 200 })
    }),

    http.get('/api/dept-list', ({ request }) => {
        const { searchParams } = new URL(request.url)
        const univ = searchParams.get('univ') || ''
        return HttpResponse.json(DEPTS[univ] || [], { status: 200 })
    }),

    http.get('/api/major-list', ({ request }) => {
        const { searchParams } = new URL(request.url)
        const univ = searchParams.get('univ') || ''
        const dept = searchParams.get('dept') || ''
        const list = MAJORS[`${univ}|${dept}`] || []
        return HttpResponse.json(list, { status: 200 })
    }),
]
