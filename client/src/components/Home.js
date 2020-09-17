import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const baseUrl = 'http://localhost:3000';

const Home = () => {
  const [roomName, setRoomName] = useState('');
  const [roomLink, setRoomLink] = useState('');

  useEffect(() => {
    setRoomLink(`${baseUrl}/room/${uuidv4()}`);
  }, []);

  return (
    <Container>
      <h1>Home</h1>
      <Form>
        <Form.Group controlId="formRoomName">
          <Form.Label>Room Name</Form.Label>
          <Form.Control
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="e.g. CPSC 110 Office Hours"
          />
        </Form.Group>
        {/* <Form.Group controlId="formRoomLink">
          <Form.Label>Link</Form.Label>
          <Form.Control readOnly value={roomLink} />
        </Form.Group> */}
        <Button variant="primary" type="submit">Create Room</Button>
      </Form>
    </Container>
  );
};

export default Home;