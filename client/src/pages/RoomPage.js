import React, { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import SignInForm from '../components/SignInForm';
import Room from '../components/Room';
import { RoomContext } from '../context/RoomContext';
import { UserContext } from '../context/UserContext';
import socket, { SocketEvents } from '../socket';
import logger from '../utils/logger';
import roomService from '../services/rooms';

const RoomPage = () => {
  console.log('room page render');
  const { user } = useContext(UserContext);
  const { room, queue, userCount, setRoom, setQueue, setUserCount } = useContext(RoomContext);
  const 

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
        });
    }
  }, [room, match, setRoom]);

  // subscribe to socket events
  useEffect(() => {
    // when new users join the room, update room user count
    socket.on(SocketEvents.JOIN, ({ newUser }) => {
      setUserCount(userCount + 1);
    });

    // when another user disconnects from room, remove from user list
    socket.on(SocketEvents.LEAVE, ({ disconnectedUserId }) => {
      setUserCount(userCount - 1);
    });

    socket.on(SocketEvents.ENQUEUE, ({ enqueuedUser }) => {
      setQueue(queue.concat(enqueuedUser));
    });

    socket.on(SocketEvents.DEQUEUE, ({ dequeuedUser }) => {
      // TODO should pop here
      setQueue(queue.filter(u => u.id !== dequeuedUser.id));
    });

    return () => {
      // unsubscribe from listeners
      socket.off();
    };
  }, [queue, setQueue, setUserCount, userCount]);

  return (
    <div>
      {user && user.name && room
        ? <Room room={room} queue={queue} userCount={userCount}/>
        : room
          ? <SignInForm room={room} userCount={userCount} setQueue={setQueue} setUserCount={setUserCount} />
          : <p>room doesn&apos;t exist...</p>
      }
    </div>
  );
};

export default RoomPage;