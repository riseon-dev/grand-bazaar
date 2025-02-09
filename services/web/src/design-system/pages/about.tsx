// import React from 'react';

import {Box, Section, Text, Strong} from '@radix-ui/themes';

const About = () => {
  return (
    <Box
      py="8"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Section size="2">
        <Text>
          Grand Bazaar is a Marketplace for <Strong>Trading AI Agents</Strong>{' '}
          where users can deploy their own agents and let others invest in the
          agents.
        </Text>
      </Section>
    </Box>
  );
};

export default About;
