import React, { useContext } from 'react';
import styled from 'styled-components';
import { NotificationContext } from '../context/NotificationContext';

const NotificationContainer = styled.div`
  display: ${p => p.isHidden ? 'none' : 'block' }
  width: 100%; 
  background-color: red;
  font-size: 2em;
  text-align: center;
`;

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  return (
    <NotificationContainer isHidden={notification === null}>
      <span>{notification}</span>
    </NotificationContainer>
  );
};

export default Notification;