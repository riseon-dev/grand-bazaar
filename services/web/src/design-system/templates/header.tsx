// import React from 'react';
import {Link} from '@tanstack/react-router';
import {Box, Flex} from '@radix-ui/themes';
import {RocketIcon} from '@radix-ui/react-icons';
import {ConnectKitButton} from 'connectkit';

const Header = () => {
  return (
    <>
      <Flex gap="3" justify={{sm: 'end', lg: 'between'}} align="end">
        <Box>
          <Link to="/">
            <img
              src={`${import.meta.env.VITE_SERVICE_WEB_PUBLIC_URL}/logo.png`}
              alt={'Home'}
              width={'50'}
            />
          </Link>
        </Box>
        <Box>
          <Link to="/about">About</Link>
        </Box>
        <Box>
          <span>
            <RocketIcon style={{display: 'inline-block'}} />{' '}
            <Link to="/deploy">Deploy your own AI agent</Link>
          </span>
        </Box>
        <Box>
          <ConnectKitButton />
        </Box>
      </Flex>
    </>
  );
};

export default Header;
