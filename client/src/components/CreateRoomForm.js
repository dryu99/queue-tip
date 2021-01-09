import React, { useContext, useState } from 'react';
import { Button, Card, Input, InputGroup, InputLabel } from './Common';
import styled from 'styled-components';
import { NotificationContext } from '../context/NotificationContext';
import { UserContext } from '../context/UserContext';
import socket, { SocketEvents } from '../socket';
import { useHistory } from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';

const FormContainer = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const CreateRoomForm = () => {
  const { triggerNotification } = useContext(NotificationContext);
  const { user, setUser } = useContext(UserContext);

  const [roomName, setRoomName] = useState('cpsc 110');
  const [adminPassword, setAdminPassword] = useState('pass');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (roomName.trim().length === 0) {
      triggerNotification('Please type in a room name!');
    } else if (adminPassword.trim().length === 0) {
      triggerNotification('Please type in a password!');
    } else {
      setUser({ ...user, name: null, isAdmin: true });

      const newRoom = {
        name: roomName,
        adminPassword
      };

      // TODO don't need to necessarily use socket here, can make http request
      // ^ actually not true if I want to listen to all new room creations for ActiveRooms
      socket.emit(SocketEvents.CREATE_ROOM, newRoom, (res) => {
        const { room, error } = res;

        if (room && !error) {
          // setRoom(room);

          // go to room url
          history.push(`/room/${room.id}`);
        } else {
          triggerNotification('Sorry room doesn\'t exist...');
        }
      });
    }
  };

  return (
    <FormContainer>
      <h2>Create Room</h2>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputLabel>Room Name</InputLabel>
          <Input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLabel>Set Admin Password</InputLabel>
          <Input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </InputGroup>
        <Button type="submit">Create Room</Button>
      </form>
    </FormContainer>
  );
};

export default CreateRoomForm;