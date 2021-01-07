import React from 'react';
import styled from 'styled-components';
import { Card } from './Common';

const ActiveRoomsListContainer = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const ActiveRoomsList = () => {
  return (
    <ActiveRoomsListContainer>
      <h2>Active Rooms</h2>
      <p>TBA</p>
    </ActiveRoomsListContainer>
  );
};

export default ActiveRoomsList;