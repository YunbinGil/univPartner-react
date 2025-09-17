import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'

async function enableMocking() {
  console.log('[MSW] VITE_USE_MOCK =', import.meta.env.VITE_USE_MOCK);
  if (import.meta.env.VITE_USE_MOCK !== '1') return;
  const { worker } = await import('./mocks/browser');
  await worker.start({
    onUnhandledRequest: 'bypass', // 핸들러 없는 요청은 실제 서버로 통과
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` }
  });
  window.msw = worker; // 디버그용
  console.log('[MSW] enabled');
}

enableMocking().then(() => {

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>,
  )
});