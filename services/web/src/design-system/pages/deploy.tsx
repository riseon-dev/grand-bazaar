import {
  Box,
  Card,
  Inset,
  Text,
  Strong,
  Flex,
  Grid,
  Button,
} from '@radix-ui/themes';
import {RocketIcon} from '@radix-ui/react-icons';
import {useAccount, useConnect, useWalletClient} from 'wagmi';
import {http, createConfig} from 'wagmi';
import {arbitrum} from 'wagmi/chains';
import {useEffect, useState} from 'react';
import {injected} from 'wagmi/connectors';

const config = createConfig({
  chains: [arbitrum],
  transports: {
    [arbitrum.id]: http(),
  },
});

const Deploy = () => {
  const [active, setActive] = useState(false);
  const [accountAddress, setAccountAddress] = useState<string | undefined>();
  // eslint-disable-next-line
  const [walletClient, setWalletClient] = useState<any | undefined>();

  const {connect} = useConnect();
  const {address: account, isConnected, connector} = useAccount();
  const {data: client} = useWalletClient({
    config,
    connector: connector,
  });

  useEffect(() => {
    if (client) {
      setWalletClient(client);
    }
  }, [client]);

  useEffect(() => {
    if (!active && isConnected) {
      setActive(true);
    } else {
      setActive(false);
      connect({connector: connector || injected()});
      setAccountAddress(account);
    }
  }, [account, isConnected]);

  // const [hash, setHash] = useState<undefined | `0x${string}`>();
  // const {
  //   data: deployTx,
  //   isError,
  //   isLoading,
  // } = useTransaction({
  //   hash,
  // })

  const useDeployTheAIAgentWallet = async () => {
    console.log('>>> 3');
    // const usdtTokenAddress = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9';

    console.log('>>> 4');
    console.log('operatorAddress', accountAddress);
    alert(`Deploying contract from account: ${accountAddress}`);
    console.log('wallet client', walletClient);
  };

  return (
    <Flex align={'center'} justify={'center'}>
      <Box maxWidth="480px">
        <Card size="2">
          <Inset clip="padding-box" side="top" pb="current">
            <img
              src={`${import.meta.env.VITE_SERVICE_WEB_PUBLIC_URL}/robot-bear.jpeg`}
              alt="Bold typography"
              style={{
                display: 'block',
                objectFit: 'cover',
                width: '100%',
                height: 140,
                backgroundColor: 'var(--gray-5)',
              }}
            />
          </Inset>
          <Grid rows={'2'}>
            <Box>
              <Text as="p" size="8">
                <Strong>Deploy Your AI Agent</Strong>
              </Text>

              <Text as="p" size="3">
                If you have an AI agent that you want to deploy, and make
                available for others to invest in, you can do so here.
              </Text>

              <Text as="p" size="3">
                Click the below button and approve the transaction for the
                trading contract to deploy.
              </Text>
            </Box>
            <Box
              minHeight={'100px'}
              style={{verticalAlign: 'center', textAlign: 'center'}}
            >
              <br />
              <Button size={'4'} onClick={useDeployTheAIAgentWallet}>
                <RocketIcon style={{display: 'inline-block'}} />
                Deploy Your AI Agent
              </Button>
            </Box>
          </Grid>
        </Card>
      </Box>
    </Flex>
  );
};

export default Deploy;
