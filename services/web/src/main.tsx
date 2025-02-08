import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createRouter, RouterProvider} from '@tanstack/react-router';
import {Theme} from '@radix-ui/themes';
import {indexRoute} from './routes';
import {aboutRoute} from './routes/about.tsx';
import {rootRoute} from './routes/__root.tsx';

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
    <Theme accentColor="crimson" grayColor="sand" radius="large">
      <RouterProvider router={router} />
    </Theme>
  </React.StrictMode>,
);
