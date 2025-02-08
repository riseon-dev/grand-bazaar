// import React from 'react';
import {Link} from '@tanstack/react-router';
import {Box, Flex} from '@radix-ui/themes';

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
          <a href="#">Deploy your own AI bot</a>
        </Box>
        <Box>
          <a href="#">Connect Wallet</a>
        </Box>
      </Flex>
    </>
  );
};

export default Header;
