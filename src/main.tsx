import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Garantir que o CSS seja aplicado imediatamente
document.documentElement.style.backgroundColor = '#0a0a0a';
document.body.style.backgroundColor = '#0a0a0a';
document.body.style.color = '#ffffff';
document.body.style.margin = '0';
document.body.style.padding = '0';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);