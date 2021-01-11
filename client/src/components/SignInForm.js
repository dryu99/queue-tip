import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import { RoomContext } from '../context/RoomContext';
import { Button, Card, CardTitle, Input, InputGroup, InputLabel } from './Common';
import socket, { SocketEvents } from '../services/socket';
import logger from '../utils/logger';
import { generateTestId } from '../utils/devHelpers';

const SignInFormContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const RoomNameText = styled.p`
  margin-top: 0;
  margin-bottom: 0.75em;
  font-size: 1.25em;
  font-style: italic;
`;

const SignInForm = ({ room, userCount, setQueue, setUserCount }) => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(generateTestId(5));

  // set current user data
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      ...user,
      name: username
    };

    // send room join request to server + receive data on current room state
    socket.emit(SocketEvents.JOIN, { newUser, roomId: room.id }, (res) => {
      const { user, queue, error } = res;
      if (!error) {
        setUser(user);
        setQueue(queue);
        setUserCount(userCount + 1);
      } else {
        logger.error(error);
        alert(error);
      }
    });
  };

  return (
    <SignInFormContainer>
      <div>
        <CardTitle>Enter Room</CardTitle>
        <RoomNameText>{room.name}</RoomNameText>
      </div>

      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputLabel>Your Name</InputLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
        <Button
          className="float-right"
          type="submit">
          Join
        </Button>
      </form>
    </SignInFormContainer>
  );
};

export default SignInForm;