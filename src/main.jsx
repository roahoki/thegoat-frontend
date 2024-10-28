import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Routing from './routing/Routing.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient.js';


const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <QueryClientProvider client={queryClient}>
        <Routing />
      </QueryClientProvider>
    </Auth0Provider>
  </StrictMode>
);
