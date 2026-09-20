import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {lazy, Suspense} from 'react';
const WorksAdmin = lazy(()=>import('./pages/WorksAdmin'));
import Works from './components/Works';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<p className="studio-wrap studio-section">Loading…</p>}>{window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/') ? <WorksAdmin/> : window.location.pathname.startsWith('/works/') ? <Works detail/> : <App/>}</Suspense>
  </StrictMode>,
);
