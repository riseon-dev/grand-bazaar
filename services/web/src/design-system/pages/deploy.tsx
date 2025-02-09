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
import {useDeploy} from '../../hooks/use-deploy.ts';

const Deploy = () => {
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
              <Button size={'4'} onClick={useDeploy}>
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
