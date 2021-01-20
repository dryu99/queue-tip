import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardTitle, Input, InputGroup, InputLabel } from './Common';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import socket, { SocketEvents } from '../services/socket';
import { useHistory } from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';

const CREATE_ROOM_DATA_CACHE_KEY = 'queuetip_create_room_data';

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

  const [roomName, setRoomName] = useState('');
  // const [userName, setUserName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const history = useHistory();

  // check cache for form data and autofill input fields
  useEffect(() => {
    const formDataJSON = localStorage.getItem(CREATE_ROOM_DATA_CACHE_KEY);
    if (formDataJSON) {
      const parsedFormData = JSON.parse(formDataJSON);

      // check if props exist in case old cache object already exists (don't want to store undefined)
      setRoomName(parsedFormData.roomName ? parsedFormData.roomName : '');
      setAdminPassword(parsedFormData.adminPassword ? parsedFormData.adminPassword : '');
    }
  }, [setRoomName, setAdminPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (roomName.trim().length === 0) {
      alert('Please type in a room name!');
    } else if (adminPassword.trim().length === 0) {
      alert('Please type in an admin password!');
    } else {
      const newRoom = {
        name: roomName,
        adminPassword
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
          setUserCount(1);

          // cache form data
          const formDataJSON = JSON.stringify({
            roomName,
            adminPassword
          });
          localStorage.setItem(CREATE_ROOM_DATA_CACHE_KEY, formDataJSON);

          // redirect to room page
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
            placeholder="e.g. CPSC 110 Office Hours"
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
        <InputGroup>
          <InputLabel>Admin Password</InputLabel>
          <Input
            type="text"
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
      </StyledForm>
    </FormContainer>
  );
};

export default CreateRoomForm;