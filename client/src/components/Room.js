import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import socket, { SocketEvents, emitJoin } from '../socket';
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
    emitJoin({ roomId: room.id }, (resData) => {
      logger.info('acknowledged from JOIN event', resData);
    });
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

const animalEmojis = ['🐢', '🐍','🦖','🦕','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐅','🐆','🦓','🦍','🐘','🦏','🐪','🐫','🦒','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🐐','🦌','🐕','🐩','🐈','🐓','🦃','🕊','🐇','🐁','🐀','🐿','🦔','🐉'];

const AdminView = ({ room, queue, userCount }) => {

  const isQueueEmpty = queue.length === 0;

  const dequeue = (e) => {
    socket.emit(SocketEvents.DEQUEUE, { roomId: room.id }, (res) => {
      const { error } = res;
      console.log(res);
      error && logger.error(error);
    });
  };

  return (
    <div>
      <h2>Admin View</h2>
      <p>{userCount} users currently in room</p>
      <ol>
        {queue.map(u =>
          <li key={u.id}>{u.name}</li>
        )}
      </ol>

      <Button disabled={isQueueEmpty} onClick={dequeue}>Dequeue</Button>
    </div>
  );
};

const PositionTextContainer = styled.div`
  display: flex;
  flow-direction: column;
  justify-content: center;
`;

const ParticipantView = ({ user, room, queue }) => {

  const joinQueue = (e) => {
    socket.emit(SocketEvents.ENQUEUE, { user, roomId: room.id }, (res) => {
      const { error } = res;
      console.log(res);
      error && logger.error(error);
    });
  };

  // TODO this is a bottleneck
  // const isUserInQueue = queue.some(u => u.id === user.id);
  const currPosition = queue.findIndex(u => u.id === user.id);

  // each user gets an emoji avatar based on the first char in their name
  const animalSpans = queue.map(u => {
    const firstCharCode = u.name.charCodeAt(0);
    const index = !isNaN(firstCharCode)
      ? firstCharCode % animalEmojis.length
      : Math.floor(Math.random() * animalEmojis.length);

    return (
      <span key={u.id}>
        {animalEmojis[index]}
      </span>
    );
  });

  return (
    <div>
      {
        currPosition === -1
          ?
          <div>
            <p>Current queue size is</p>
            <h1>{queue.length}</h1>
          </div>
          :
          <div>
            <p>Your current queue position is</p>
            <h1>{currPosition + 1}</h1>
            <p>out of <b>{queue.length}</b></p>
          </div>
      }
      <div>
        {animalSpans}
      </div>
      <Button disabled={currPosition !== -1} onClick={joinQueue}>Join Queue</Button>
    </div>
  );
};

const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const StyledH1 = styled.h1`
  margin: 0 0 0.5em 0;
`;

const NameText = styled.p`
  margin: 0 0 0.5em 0;
`;

const Room = () => {
  const { user } = useContext(UserContext);
  const { room, queue, userCount } = useContext(RoomContext);

  // const currQueuePos

  return (
    <RoomContainer>
      <StyledH1>{room.name}</StyledH1>
      <NameText>Welcome <b>{user.name}</b></NameText>
      {
        user.isAdmin ?
          <AdminView
            room={room}
            queue={queue}
            userCount={userCount}
          />
          :
          <ParticipantView
            room={room}
            user={user}
            queue={queue}
          />
      }
    </RoomContainer>
  );
};

export default Room;