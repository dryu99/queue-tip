import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

// TODO would love to link my details on bottom, but for now it's okay to have in header
const Footer = () => {
  return(
    <Navbar sticky="bottom">
      <Container className="mt-5 mb-2 justify-content-center">
        <small className="text-muted">
          <i><a href={'https://en.wikipedia.org/wiki/Daniel_(Elton_John_song)'}>Daniel Ryu</a> 2020</i>
        </small>
      </Container>
    </Navbar>
  );
};

export default Footer;