import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { LangchainProvider } from './context/langchain.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangchainProvider>
      <App />
    </LangchainProvider>
  </StrictMode>
);
