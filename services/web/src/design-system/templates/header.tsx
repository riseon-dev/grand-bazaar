// import React from 'react';
import {Link} from '@tanstack/react-router';
import {Box, Button, Flex} from '@radix-ui/themes';
import {RocketIcon} from '@radix-ui/react-icons';

const Header = () => {
  return (
    <>
      <Flex gap="3" justify={{sm: 'end', lg: 'between'}} align="end">
        <Box>
          <Link to="/">Home</Link>
        </Box>
        <Box>
          <Link to="/about">About</Link>
        </Box>
        <Box>
          <span>
            <RocketIcon style={{display: 'inline-block'}} />
            <a href="#"> Deploy your own AI bot</a>
          </span>
        </Box>
        <Box>
          <Button variant="solid" size={'3'}>
            Connect Wallet
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Header;
