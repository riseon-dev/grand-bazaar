import {WagmiProvider, createConfig, http} from 'wagmi';
import {mainnet, arbitrum} from 'wagmi/chains';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ConnectKitProvider, getDefaultConfig} from 'connectkit';

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, arbitrum],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_ID}`,
      ),
      [arbitrum.id]: http(
        `https://arb-mainnet.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_ID}`,
      ),
    },

    // Required API Keys
    walletConnectProjectId: process.env.VITE_REOWN_WALLET_PROJECT_ID || '',

    // Required App Info
    appName: 'Riseon Grand Bazaar',

    // Optional App Info
    appDescription: 'Marketplace for AI Trading Agents',
    appUrl: 'https://family.co', // your app's url
    appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();
//eslint-disable-next-line
export const Web3Provider = ({children}: any) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
