import { useEffect, useState } from 'react'
import { api } from '../lib/api'  // 위에서 만든 axios 인스턴스

export default function Home() {
  const [ping, setPing] = useState(null)
  useEffect(() => {
    api.get('/health').then(r => setPing(r.data))
  }, [])
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">내제휴 홈</h1>
      <pre className="mt-3 text-xs bg-gray-100 p-2 rounded">{JSON.stringify(ping, null, 2)}</pre>
    </div>
  )
}