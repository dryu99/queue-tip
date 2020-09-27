import React from 'react';
import { Navbar } from 'react-bootstrap';

const NavHeader = () => {
  return (
    <Navbar className="" bg="dark" variant="dark">
      <Navbar.Brand className="mr-auto" href="/">Queue-Tip</Navbar.Brand>
      <small className="text-muted">
        <a href={'https://en.wikipedia.org/wiki/Daniel_(Elton_John_song)'}>Daniel Ryu</a> 2020
      </small>
    </Navbar>
  );
};

export default NavHeader;