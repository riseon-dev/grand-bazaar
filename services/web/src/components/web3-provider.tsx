import {WagmiProvider, createConfig, http} from 'wagmi';
import {arbitrum, mainnet} from 'wagmi/chains';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ConnectKitProvider, getDefaultConfig} from 'connectkit';
import React from 'react';

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, arbitrum],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_ID}`,
      ),
      [arbitrum.id]: http(
        `https://arb-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_ID}`,
      ),
    },

    // Required API Keys
    walletConnectProjectId: import.meta.env.VITE_REOWN_WALLET_PROJECT_ID || '',

    // Required App Info
    appName: 'Grand Bazaar',

    // Optional App Info
    appDescription: 'Marketplace for Trading AI Agents',
    appUrl: `${import.meta.env.VITE_SERVICE_WEB_PUBLIC_URL}`, // your app's url
    appIcon: `${import.meta.env.VITE_SERVICE_WEB_PUBLIC_URL}/logo.png`, // your app's icon, no bigger than 1024x1024px
    // (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({children}: {children: React.ReactNode}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
