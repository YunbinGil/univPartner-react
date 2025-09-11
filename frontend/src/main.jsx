import React from 'react'
import ReactDOM  from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter  } from 'react-router-dom'

 async function enableMocking() {
   if (import.meta.env.VITE_USE_MOCK !== '1') return;
   const { worker } = await import('./mocks/browser');
   await worker.start({ serviceWorker: { url: '/mockServiceWorker.js' } });
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