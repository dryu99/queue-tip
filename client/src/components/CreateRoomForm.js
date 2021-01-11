import React, { useContext, useState } from 'react';
import { Button, Card, CardTitle, Input, InputGroup, InputLabel } from './Common';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import socket, { SocketEvents } from '../socket';
import { useHistory } from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';

const FormContainer = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const CreateRoomForm = () => {
  const { setUser } = useContext(UserContext);
  const { setRoom, setUserCount } = useContext(RoomContext);

  const [roomName, setRoomName] = useState('CPSC 110 Office Hours');
  const [userName, setUserName] = useState('daniel');
  const [adminPassword, setAdminPassword] = useState('pass');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (roomName.trim().length === 0) {
      alert('Please type in a room name!');
    } else if (userName.trim().length === 0) {
      alert('Please type in your name!');
    } else if (adminPassword.trim().length === 0) {
      alert('Please type in a password!');
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
      socket.emit(SocketEvents.CREATE_ROOM, { newRoom, newUser }, (res) => {
        const { user, room, error } = res;

        if (room && !error) {
          setUser(user);
          setRoom(room);
          setUserCount(1);

          history.push(`/room/${room.id}`);
        } else {
          alert('Something went wrong with room creation, please try again!');
        }
      });
    }
  };

  return (
    <FormContainer>
      <CardTitle>Create Room</CardTitle>
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
        <Button
          className="float-right"
          type="submit"
        >
          Create Room
        </Button>
      </form>
    </FormContainer>
  );
};

export default CreateRoomForm;