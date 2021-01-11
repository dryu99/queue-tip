import React from 'react';
import styled from 'styled-components';
import { Card, CardTitle } from './Common';

const ActiveRoomsListContainer = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const ActiveRoomsList = () => {
  return (
    <ActiveRoomsListContainer>
      <CardTitle>Active Rooms</CardTitle>
      <p>TBA</p>
    </ActiveRoomsListContainer>
  );
};

export default ActiveRoomsList;