import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Theme anti-flash (run before first paint)
const themeScript = `
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light') document.documentElement.classList.add('light');
  } catch(e) {}
`;
const s = document.createElement('script');
s.innerHTML = themeScript;
document.head.insertBefore(s, document.head.firstChild);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
