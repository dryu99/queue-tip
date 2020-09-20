import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { UserTypes } from '../enums';

import { emitCreateRoom } from '../socket';

const Home = ({ setCurrentUserType, setRoomCallback }) => {
  const [newRoomName, setNewRoomName] = useState('');

  const history = useHistory();

  const handleCreateRoomClick = (e) => {
    const newRoomId = uuidv4();

    if (newRoomId && newRoomName && newRoomName.trim() !== '') {
      // users who create rooms are admins
      setCurrentUserType(UserTypes.ADMIN);

      // send a create room event to server
      emitCreateRoom(
        { roomName: newRoomName, roomId: newRoomId },
        setRoomCallback
      );

      // route to room resource
      history.push(`/room/${newRoomId}`);
    } else {
      e.preventDefault();
      console.error('error creating room');
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-5">queue-tip</h1>
      <Form>
        <Form.Row className="justify-content-center mb-3">
          <Col xs="auto">
            <Form.Control
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              placeholder="Room Name"
            />
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center">
          <Col xs="auto">
            <Button onClick={handleCreateRoomClick} variant="primary" type="submit">Create Room</Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
};

export default Home;