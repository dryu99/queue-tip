import React, { useState } from 'react';
import { Button, Container, Form, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import logger from '../utils/logger';

import CreateRoomForm from '../components/CreateRoomForm';
import styled from 'styled-components';
import ActiveRoomsList from '../components/ActiveRoomsList';
import Introduction from '../components/Introduction';

const OldHome = ({ setIsAdmin, setRoom, setRoomError }) => {
  const [newRoomName, setNewRoomName] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [alertText, setAlertText] = useState('');

  const history = useHistory();

  const handleCreateRoomClick = (e) => {
    e.preventDefault();

    if (newRoomName.trim().length === 0) {
      setAlertText('Please type in a room name!');
    } else if (newAdminPassword.trim().length === 0) {
      setAlertText('Please type in an admin password!');
    } else {
      // users who create rooms are admins
      setIsAdmin(true);

      // create room on server, set room on client and enter room if it does
      logger.info('emitting room creation event');
      // emitCreateRoom({ name: newRoomName, adminPassword: newAdminPassword }, (resData) => {
      //   const { room, error } = resData;

      //   if (room && !error) {
      //     setRoom(room);

      //     // go to room url
      //     history.push(`/room/${room.id}`);
      //   } else {
      //     logger.error(error);
      //     setRoomError('Sorry room doesn\'t exist...');
      //   }
      // });
    }
  };

  return (
    <Container className="mt-4">
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
        <Form.Row className="justify-content-center mb-3">
          <Col xs="auto">
            <Form.Label>Admin Password</Form.Label>
            <Form.Control
              value={newAdminPassword}
              onChange={(e) => setNewAdminPassword(e.target.value)}
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
            <Button
              onClick={handleCreateRoomClick}
              variant="primary"
              type="submit"
            >
              Create Room
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
};

const HomePageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  & > div {
    width: 50%;
  }
`;

const HomePage = () => {
  return (
    <div>
      <HomePageContainer>
        {/* <ActiveRoomsList /> */}
        <Introduction />
        <CreateRoomForm />
      </HomePageContainer>
    </div>
  );
};

export default HomePage;