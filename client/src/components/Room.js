import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import socket, { SocketEvents } from '../services/socket';
import logger from '../utils/logger';

import RoomName from './RoomName';
import RoomActions from './RoomActions';
import Queue from './Queue';
import AdminPopup from './AdminPopup';

import './room.css';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';
import { UserContext } from '../context/UserContext';
import { Button } from './Common';
import styled from 'styled-components';
import ParticipantRoomView from './ParticipantRoomView';
import AdminRoomView from './AdminRoomView';

const OldRoom = ({ isAdmin, setIsAdmin, room, queuedUsers, setQueuedUsers }) => {
  const [currentName, setCurrentName] = useState('');
  const [adminPopupOpen, setAdminPopupOpen] = useState(false);

  // subscribe to relevant socket events
  useEffect(() => {
    // when another user joins queue, add them to queue list
    socket.on(SocketEvents.ENQUEUE, ({ enqueuedUser }) => {
      logger.info('received ENQUEUE event', enqueuedUser);
      setQueuedUsers(queuedUsers.concat(enqueuedUser));
    });

    // when another user leaves queue, remove from to queue list
    socket.on(SocketEvents.DEQUEUE, ({ dequeuedUser }) => {
      logger.info('received DEQUEUE event', dequeuedUser);
      setQueuedUsers(queuedUsers.filter(m => m.name !== dequeuedUser.name));
    });

    // on component unmount, disconnect and turn off socket
    return () => {
      socket.emit(SocketEvents.DISCONNECT);
      socket.off();
    };
  }, [queuedUsers, room]);

  // emit relevant socket events
  useEffect(() => {
    // let server know that new connection has joined this room
    // emitJoin({ roomId: room.id }, (resData) => {
    //   logger.info('acknowledged from JOIN event', resData);
    // });
  }, [room]);

  // check cache for current name data
  useEffect(() => {
    logger.info('checking local cache for signed in user data...');
    const userJSON = localStorage.getItem('currentNameData');

    if (userJSON) {
      logger.info('found data in local cache!');
      const currentNameData = JSON.parse(userJSON);
      logger.info(currentNameData);

      if (currentNameData.value) {
        setCurrentName(currentNameData.value);
      }
    }
  }, []);

  return (
    <>
      <Container className="mt-4">
        <RoomName room={room}/>
        <hr/>
        <RoomActions
          currentName={currentName}
          setCurrentName={setCurrentName}
          isAdmin={isAdmin}
          setAdminPopupOpen={setAdminPopupOpen}
          room={room}
          queuedUsers={queuedUsers}
        />
        <hr/>
        <Queue
          room={room}
          isAdmin={isAdmin}
          currentName={currentName}
          queuedUsers={queuedUsers}
        />
      </Container>
      <AdminPopup
        show={adminPopupOpen}
        room={room}
        setIsAdmin={setIsAdmin}
        setAdminPopupOpen={setAdminPopupOpen}
      />
    </>
  );
};

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const RoomNameText = styled.h1`
  margin: 0 0 0.5em 0;
`;

const NameText = styled.p`
  margin: 0 0 0.5em 0;
  font-size: 1.25em;
`;

const AdminIcon = styled.span`
  margin: 0.5em;
`;

const Room = ({ room, queue, userCount }) => {
  const { user } = useContext(UserContext);

  return (
    <RoomContainer>
      <RoomNameText>{room.name}</RoomNameText>
      <NameText>
        Welcome <b>{user.name}</b>!
        {user.isAdmin ? <AdminIcon>👑</AdminIcon> : null}
      </NameText>
      {
        user.isAdmin ?
          <AdminRoomView
            room={room}
            queue={queue}
            userCount={userCount}
          />
          :
          <ParticipantRoomView
            room={room}
            user={user}
            queue={queue}
          />
      }
    </RoomContainer>
  );
};

export default Room;