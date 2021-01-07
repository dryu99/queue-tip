import React, { useState } from 'react';
import { Button, Card, Input } from './Common';
import styled from 'styled-components';

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
`;

const InputLabel = styled.label`
  margin-bottom: 0.25em;
`;

const FormContainer = styled(Card)`
    display: flex;
    flex-direction: column;
  `;

const CreateRoomForm = () => {
  const [roomName, setRoomName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  // const [alertText, setAlertText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('oi');
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