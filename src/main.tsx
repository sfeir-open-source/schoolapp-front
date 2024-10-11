import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import DynamicProviders from './shared/components/DynamicProvider';
import { EditModeProvider } from './shared/providers/EditModeProvider';
import { AppQueryClientProvider } from './shared/providers/AppQueryClientProvider';

const providers = [AppQueryClientProvider, BrowserRouter, EditModeProvider];

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <DynamicProviders providers={providers}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </DynamicProviders>
);
