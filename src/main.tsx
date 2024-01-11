import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './core/authentification/AuthProvider';
import { CookiesProvider } from 'react-cookie';
import { EditModeContext } from './shared/context/edit-mode.context';
import { useState } from 'react';
import { useEditMode } from './pages/Home/hooks/edit-mode.hook';

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
