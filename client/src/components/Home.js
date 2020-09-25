import React, { useState } from 'react';
import { Button, Container, Form, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserTypes } from '../types';
import logger from '../utils/logger';

import { emitCreateRoom } from '../socket';

const Home = ({ setCurrentUserType, setRoom, setRoomError }) => {
  const [newRoomName, setNewRoomName] = useState('');
  const [alertText, setAlertText] = useState('');

  const history = useHistory();

  const handleCreateRoomClick = (e) => {
    e.preventDefault();

    if (newRoomName && newRoomName.trim() !== '') {
      // users who create rooms are admins
      setCurrentUserType(UserTypes.ADMIN);

      // create room on server, set room on client and enter room if it does
      logger.info('emitting room creation event');
      emitCreateRoom({ name: newRoomName }, (resData) => {
        const { room, error } = resData;

        if (room && !error) {
          setRoom(room);

          // go to room url
          history.push(`/room/${resData.room.id}`);
        } else {
          logger.error(error);
          setRoomError('sorry room doesn\'t exist...');
        }
      });
    } else {
      setAlertText('Room name can\'t be empty!');
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-5">queue-tip</h1>
      <Form>
        <Form.Row className="justify-content-center mb-3">
          <Col xs="auto">
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              placeholder="CPSC 110 Office Hours"
            />
          </Col>
        </Form.Row>
        <Form.Row className="justify-content-center mb-2">
          <Col xs="auto">
            <Form.Text className="text-muted">
              {alertText}
            </Form.Text>
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