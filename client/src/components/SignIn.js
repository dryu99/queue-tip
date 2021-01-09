import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import { Button, Card, Input, InputGroup, InputLabel } from './Common';
import socket, { SocketEvents } from '../socket';
import logger from '../utils/logger';
import { RoomContext } from '../context/RoomContext';

const SignInContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// TODO rename to Create User Form or sth lol
const SignIn = () => {
  const { user, setUser } = useContext(UserContext);
  const { room, setUsers, setQueue } = useContext(RoomContext);
  const [username, setUsername] = useState(makeid(5));

  // set current user data
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      ...user,
      name: username,
      roomId: room.id
    };

    // send join request to server + receive data on current room state
    socket.emit(SocketEvents.JOIN, newUser, (res) => {
      const { user, users, queue, error } = res;

      if (!error) {
        setUser(user);
        setUsers(users);
        setQueue(queue);
      } else {
        logger.error(error);
      }
    });
  };

  return (
    <SignInContainer>
      <h2>Join Room {`"${room.name}"`}</h2>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputLabel>Your Name</InputLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
        <Button type="submit">Join</Button>
      </form>
    </SignInContainer>
  );
};

export default SignIn;