import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const Home = () => {
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    // generate unique room id
    setRoomId(uuidv4());
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
        <Link
          to={`/room/${roomId}?name=${roomName}`}
          onClick={(e) => (!roomName || !roomId) ? e.preventDefault() : null}
        >
          <Button variant="primary" type="submit">Create Room</Button>
        </Link>
      </Form>
    </Container>
  );
};

export default Home;