import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import SignIn from '../components/SignIn';
import Room from '../components/Room';
import { RoomContext } from '../context/RoomContext';
import { UserContext } from '../context/UserContext';
import socket, { SocketEvents } from '../socket';
import logger from '../utils/logger';

const RoomPage = () => {
  console.log('room page render');
  const { user } = useContext(UserContext);
  // const [room, setRoom] = useState(null);
  const { room, users, queue, setRoom, setUsers, setQueue } = useContext(RoomContext);

  const match = useRouteMatch('/room/:id');

  // check to see if room exists on server, if so, init room data
  useEffect(() => {
    if (match && !room) {
      socket.emit(SocketEvents.ROOM_CHECK, { roomId: match.params.id }, (res) => {
        const { room, error } = res;

        if (room && !error) {
          setRoom(room);
        } else {
          logger.error(error);
        }
      });
    }
  }, [room, match, setRoom]);

  // subscribe to relevant socket events
  useEffect(() => {
    // when new users join the room, update user list
    socket.on(SocketEvents.JOIN, ({ user }) => {
      setUsers(users.concat(user));
    });

    // when another user disconnects from room, remove from user list
    socket.on(SocketEvents.LEAVE, ({ user }) => {
      setUsers(users.filter(u => u.name !== user.name));
    });

    return () => {
      // unsubscribe from listeners
      socket.off();
    };
  }, [setUsers, users]);

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