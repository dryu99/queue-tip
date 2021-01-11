import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import SignInForm from '../components/SignInForm';
import Room from '../components/Room';
import { RoomContext } from '../context/RoomContext';
import { UserContext } from '../context/UserContext';
import socket, { SocketEvents } from '../services/socket';
import logger from '../utils/logger';
import roomService from '../services/rooms';
import styled from 'styled-components';

const RoomPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const RoomPage = () => {
  const { user } = useContext(UserContext);
  const { room, queue, userCount, setRoom, setQueue, setUserCount } = useContext(RoomContext);
  const [roomChecked, setRoomChecked] = useState(false);

  const match = useRouteMatch('/room/:id');

  // init room data if it exists, ow error
  useEffect(() => {
    if (match && !room) {
      roomService.getSingle(match.params.id)
        .then(room => {
          setRoom(room);
        })
        .catch(error => {
          logger.error(error);
        })
        .finally(() => {
          setRoomChecked(true);
        });
    }
  }, [room, match, setRoom]);

  // subscribe to socket events
  useEffect(() => {
    // when new users join the room, update room user count
    socket.on(SocketEvents.JOIN, () => {
      setUserCount(userCount + 1);
    });

    // when another user disconnects from room, remove from user list
    socket.on(SocketEvents.LEAVE, ({ disconnectedUserId }) => {
      setQueue(queue.filter(u => u.id !== disconnectedUserId));
      setUserCount(userCount - 1);
    });

    // when another user joins queue, update queue
    socket.on(SocketEvents.ENQUEUE, ({ enqueuedUser }) => {
      setQueue(queue.concat(enqueuedUser));
    });

    // when another user leaves queue, update queue
    socket.on(SocketEvents.DEQUEUE, ({ dequeuedUserId }) => {
      setQueue(queue.filter(u => u.id !== dequeuedUserId));
    });

    return () => {
      // unsubscribe from listeners
      socket.off();
    };
  }, [queue, setQueue, setUserCount, userCount]);

  // TODO make this more clean
  return (
    <RoomPageContainer>
      {
        user && user.name && room
          ? <Room room={room} queue={queue} userCount={userCount}/>
          : room
            ? <SignInForm room={room} userCount={userCount} setQueue={setQueue} setUserCount={setUserCount} />
            : roomChecked
              ? <p>Room <i>{match.params.id}</i> doesn&apos;t exist...</p>
              : null
      }
    </RoomPageContainer>
  );
};

export default RoomPage;