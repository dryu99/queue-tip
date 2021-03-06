import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import { Button, Card, CardTitle, Input, InputGroup, InputLabel } from './Common';
import socket, { SocketEvents } from '../services/socket';
import logger from '../utils/logger';

const SIGN_IN_DATA_CACHE_KEY = 'queuetip_sign_in_data';

const SignInFormContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const RoomNameText = styled.p`
  margin-top: 0;
  margin-bottom: 0.75em;
  font-size: 1.25em;
  text-align: center;
`;

const SignInForm = ({ room, setQueue, setUserCount }) => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');

  // check cache for form data and autofill input fields
  useEffect(() => {
    const formDataJSON = localStorage.getItem(SIGN_IN_DATA_CACHE_KEY);
    if (formDataJSON) {
      const parsedFormData = JSON.parse(formDataJSON);
      setUsername(parsedFormData.username);
    }
  }, [setUsername]);

  // set current user data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length === 0) {
      alert('Please type in your name!');
    } else {
      const newUser = {
        ...user,
        name: username
      };

      // send room join request to server + receive data on current room state
      socket.emit(SocketEvents.JOIN, { newUser, roomId: room.id }, (res) => {
        const { user, queue, userCount, error } = res;
        if (!error) {
          setUser(user);
          setQueue(queue);
          setUserCount(userCount);

          // cache form data
          const formDataJSON = JSON.stringify({ username: user.name });
          localStorage.setItem(SIGN_IN_DATA_CACHE_KEY, formDataJSON);
        } else {
          logger.error(error);
          alert(error);
        }
      });
    }
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