import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import socket from '../socket';
import { SocketEvents } from '../socket';

const Home = ({ setIsAdmin, setRoomCallback }) => {
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomId, setNewRoomId] = useState('');

  useEffect(() => {
    // randomly generates uuid
    setNewRoomId(uuidv4());
  }, []);

  // users who create a room are considered as 'admins'
  const handleCreateRoomClick = (e) => {
    if (newRoomId && newRoomName && newRoomName.trim() !== '') {
      setIsAdmin(true);
      socket.emit(SocketEvents.CREATE_ROOM, { roomName: newRoomName, roomId: newRoomId }, setRoomCallback);
    } else {
      e.preventDefault();
      console.log('error creating room');
    }
  };

  const toProp = {
    pathname: `/room/${newRoomId}`
  };

  return (
    <Container>
      <h1>Home</h1>
      <Form>
        <Form.Group controlId="formNewRoomName">
          <Form.Label>Room Name</Form.Label>
          <Form.Control
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="e.g. CPSC 110 Office Hours"
          />
        </Form.Group>
        <Link
          to={toProp}
          onClick={handleCreateRoomClick}
        >
          <Button variant="primary" type="submit">Create Room</Button>
        </Link>
      </Form>
    </Container>
  );
};

export default Home;