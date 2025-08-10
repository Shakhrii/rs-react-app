import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './store/store.ts';
import './index.css';
import App from './app/App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={setupStore()}>
        <App />
      </Provider>
    </StrictMode>
  );
}
