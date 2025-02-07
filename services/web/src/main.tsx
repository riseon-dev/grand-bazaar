import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Web3Provider} from './components/web3-provider.tsx';
import {ThemeProvider} from './context/theme-context.tsx';
import {FontProvider} from './context/font-context.tsx';
import {router} from './components/web3-provider.tsx';
import {RouterProvider} from '@tanstack/react-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Web3Provider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <FontProvider>
          <RouterProvider router={router} />
        </FontProvider>
      </ThemeProvider>
    </Web3Provider>
  </React.StrictMode>,
);
