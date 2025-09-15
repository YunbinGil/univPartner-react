import { api } from '../lib/api'

// [GET] /api/univ-list -> string[]
export async function getUnivList() {
    const { data } = await api.get('/api/univ-list')
    return data // ["건국대학교", "UMKC", ...]
}

// [GET] /api/dept-list?univ=...
export async function getDeptList(univ) {
    const { data } = await api.get(`/api/dept-list`, { params: { univ } })
    return data // ["공과대학", "사회과학대학", ...]
}

// [GET] /api/major-list?univ=...&dept=...
export async function getMajorList(univ, dept) {
    const { data } = await api.get(`/api/major-list`, { params: { univ, dept } })
    return data // ["컴퓨터공학부", ...]
}
