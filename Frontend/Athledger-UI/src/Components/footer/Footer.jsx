import React from 'react';
import { Segment, Container } from 'semantic-ui-react';

const Footer = () => {
  return (
    <Segment inverted vertical style={{ padding: '1em 0em', position: 'fixed', bottom: 0, width: '100%', textAlign: 'center' }}>
      <Container textAlign='center' style={{ color: '#aaa', fontSize: '14px' }}>
        © {new Date().getFullYear()} Athledger. All rights reserved.
      </Container>
    </Segment>
  );
};

export default Footer;
