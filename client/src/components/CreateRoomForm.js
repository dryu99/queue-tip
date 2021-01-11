import React, { useContext, useState } from 'react';
import { Button, Card, CardTitle, Input, InputGroup, InputLabel } from './Common';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import socket, { SocketEvents } from '../services/socket';
import { useHistory } from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';
import { generateTestId } from '../utils/devHelpers';

const FormContainer = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled.form`
  height: 100%;
`;

const CreateRoomForm = () => {
  const { setUser } = useContext(UserContext);
  const { setRoom, setUserCount } = useContext(RoomContext);

  const [roomName, setRoomName] = useState(generateTestId(10));
  // const [userName, setUserName] = useState('');
  // const [adminPassword, setAdminPassword] = useState('');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (roomName.trim().length === 0) {
      alert('Please type in a room name!');
    } else {
      const newRoom = {
        name: roomName,
        adminPassword: 'placeholder'
      };

      const newUser = {
        name: 'admin',
        isAdmin: true
      };

      // TODO don't need to necessarily use socket here, can make http request
      socket.emit(SocketEvents.CREATE_ROOM, { newRoom, newUser }, (res) => {
        const { user, room, error } = res;

        if (room && !error) {
          setUser(user);
          setRoom(room);
          setUserCount(0);

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
      <StyledForm onSubmit={handleSubmit}>
        <InputGroup>
          <InputLabel>Room Name</InputLabel>
          <Input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </InputGroup>
        {/* <InputGroup>
          <InputLabel>Your Name</InputLabel>
          <Input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </InputGroup> */}
        {/* <InputGroup>
          <InputLabel>New Admin Password</InputLabel>
          <Input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </InputGroup> */}
        <Button
          className="float-right"
          type="submit"
        >
          Create Room
        </Button>
      </StyledForm>
    </FormContainer>
  );
};

export default CreateRoomForm;