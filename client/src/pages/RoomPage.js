import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import SignIn from '../components/SignIn';
import Room from '../components/Room';
import { RoomContext } from '../context/RoomContext';
import { UserContext } from '../context/UserContext';
import socket, { SocketEvents } from '../socket';
import logger from '../utils/logger';
import roomService from '../services/rooms';

const RoomPage = () => {
  console.log('room page render');
  const { user } = useContext(UserContext);
  // const [room, setRoom] = useState(null);
  const { room, queue, userCount, setRoom, setQueue, setUserCount } = useContext(RoomContext);

  const match = useRouteMatch('/room/:id');

  // check to see if room exists on server, if so, init room data
  useEffect(() => {
    if (match && !room) {
      roomService.getSingle(match.params.id)
        .then(room => {
          setRoom(room);
        })
        .catch(error => {
          logger.error(error);
        });
      // socket.emit(SocketEvents.ROOM_CHECK, { roomId: match.params.id }, (res) => {
      //   const { room, error } = res;

      //   if (room && !error) {
      //     setRoom(room);
      //   } else {
      //     logger.error(error);
      //   }
      // });
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
        ? <Room />
        : room
          ? <SignIn />
          : <p>room doesn&apos;t exist...</p>
      }
    </div>
  );
};

export default RoomPage;