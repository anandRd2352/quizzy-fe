import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Your CSS
import App from './App.jsx';

// Rendering directly to body for full-page layout
createRoot(document.body).render(
  <StrictMode>
    <App />
  </StrictMode>
);
