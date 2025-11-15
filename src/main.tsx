import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@app/app'
import { Cursor, Preloader } from '@components';
import { PreloaderProvider } from '@hooks/usePreloader';

const root = document.querySelector('#root');

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <Cursor />
    <PreloaderProvider>
      <Preloader />
      <App />
    </PreloaderProvider>
  </StrictMode>,
)