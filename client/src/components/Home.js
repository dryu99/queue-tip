import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import socket from '../socket';
import { SocketEvents } from '../socket';

const Home = ({ setIsAdmin }) => {
  const [newRoomName, setNewRoomName] = useState('');

  // randomly generated uuid
  const roomId = uuidv4();

  const handleCreateRoomClick = (e) => {
    if (roomId && newRoomName && newRoomName.trim() !== '') {
      setIsAdmin(true);
      socket.emit(SocketEvents.CREATE_ROOM, { roomName: newRoomName, roomId });
    } else {
      e.preventDefault();
      console.log('error creating room');
    }
  };

  const toProp = {
    pathname: `/room/${roomId}`,
    roomName: newRoomName
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