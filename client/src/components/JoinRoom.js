import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import { Button, Card, Input, InputGroup, InputLabel } from './Common';
import socket, { SocketEvents } from '../socket';
import logger from '../utils/logger';

const JoinRoomContainer = styled(Card)`
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
const JoinRoom = ({ room }) => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(makeid(5));

  // set current user data
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { ...user, name: username, roomId: room.id };
    setUser(newUser);
  };

  return (
    <JoinRoomContainer>
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
    </JoinRoomContainer>
  );
};

export default JoinRoom;