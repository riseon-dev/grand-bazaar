// import React from 'react';

import {Box, Text} from '@radix-ui/themes';

const Footer = () => {
  return (
    <>
      <Box>
        <Text align="center" as="p" size="2" color="gray">
          <img
            src={
              import.meta.env.VITE_SERVICE_WEB_PUBLIC_URL +
              '/built-on-ethereum.png'
            }
            alt="Built on Ethereum"
            width={'200px'}
            style={{display: 'inline-block'}}
          />
          Copyright (c) 2025, Riseon
        </Text>
      </Box>
    </>
  );
};

export default Footer;
