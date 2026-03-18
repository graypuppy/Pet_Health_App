import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PetProvider } from './contexts/PetContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PetProvider>
      <App />
    </PetProvider>
  </StrictMode>,
);
