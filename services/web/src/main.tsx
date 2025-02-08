import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createRouter, RouterProvider} from '@tanstack/react-router';
import {Theme} from '@radix-ui/themes';
import {indexRoute} from './routes';
import {aboutRoute} from './routes/about.tsx';
import {rootRoute} from './routes/__root.tsx';
import {Web3Provider} from './components/web3-provider.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// Build the route tree
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

// Create the router instance
const router = createRouter({routeTree});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

root.render(
  <React.StrictMode>
    <Theme
      accentColor="jade"
      grayColor="sage"
      panelBackground="solid"
      radius="large"
    >
      <Web3Provider>
        <RouterProvider router={router} />
      </Web3Provider>
    </Theme>
  </React.StrictMode>,
);
