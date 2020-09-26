import React from 'react';
import { Container, Navbar, Button, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return(
    <div className="fixed-bottom">
      <Navbar>
        <Container>

          <Button size="lg" block>Join Queue</Button>


        </Container>
      </Navbar>
    </div>
  );
};

export default Footer;