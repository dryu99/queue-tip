import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';

const Footer = () => {
  return(
    <Navbar sticky="bottom">
      <Container className="mt-5 mb-2 justify-content-center">
        <small className="text-muted">
          <i><a href={'https://github.com/dryu99'}>Daniel Ryu</a> 2020</i>
        </small>
      </Container>
    </Navbar>
  );
};

export default Footer;