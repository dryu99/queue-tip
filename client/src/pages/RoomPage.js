import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import JoinRoom from '../components/JoinRoom';
import Room from '../components/Room';
import { UserContext } from '../context/UserContext';
import socket, { SocketEvents } from '../socket';
import logger from '../utils/logger';

const RoomPage = () => {
  console.log('room page render');
  const { user } = useContext(UserContext);
  const [room, setRoom] = useState(null);
  // const { room, users, setRoom, setUsers, setQueue } = useContext(RoomContext);

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

  return (
    <div>
      {user && user.name && room
        ? <Room room={room}/>
        : room
          ? <JoinRoom room={room} />
          : <p>room doesn&apos;t exist...</p>
      }
    </div>
  );
};

export default RoomPage;