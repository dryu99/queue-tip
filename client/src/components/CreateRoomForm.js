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
  const { setUser } = useContext(UserContext);
  const { setRoom, setUserCount } = useContext(RoomContext);

  const [roomName, setRoomName] = useState('cpsc 110');
  const [userName, setUserName] = useState('dan');
  const [adminPassword, setAdminPassword] = useState('pass');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (roomName.trim().length === 0) {
      triggerNotification('Please type in a room name!');
    } else if (userName.trim().length === 0) {
      triggerNotification('Please type in your name!');
    } else if (adminPassword.trim().length === 0) {
      triggerNotification('Please type in a password!');
    } else {
      const newRoom = {
        name: roomName,
        adminPassword
      };

      const newUser = {
        name: userName,
        isAdmin: true
      };

      // TODO don't need to necessarily use socket here, can make http request
      // ^ actually not true if I want to listen to all new room creations for ActiveRooms
      socket.emit(SocketEvents.CREATE_ROOM, { newRoom, newUser }, (res) => {
        const { user, room, error } = res;

        if (room && !error) {
          setUser(user);
          setRoom(room);
          setUserCount(1);

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
          <InputLabel>Your Name</InputLabel>
          <Input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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