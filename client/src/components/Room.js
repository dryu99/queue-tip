import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, useRouteMatch } from 'react-router-dom';
import socket, { SocketEvents } from '../socket';

import SignInPopup from './SignInPopup';

const Room = ({ isAdmin, user, setUser }) => {
  const location = useLocation();
  const match = useRouteMatch('/room/:id');

  const [roomName, setRoomName] = useState(location.roomName);
  const [roomId, setRoomId] = useState(match.params.id);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // when someone else joins, add them to user list
    socket.on(SocketEvents.NEW_USER_JOIN, ({ newUser }) => {
      console.log('received JOIN event', user);
      setUsers([...users, newUser]);
    });

    // on component unmount, disconnect and turn off socket
    return () => {
      socket.emit(SocketEvents.DISCONNECT);
      socket.off();
    };
  }, [users]);

  return (
    <Container>
      <h1>Room: {roomName}</h1>
      <h2>Users:</h2>
      <ul>
        {users.map(u =>
          <li key={u.id}>{u.name}</li>
        )}
      </ul>
      <SignInPopup roomId={roomId} setUser={setUser} users={users} setUsers={setUsers} />
    </Container>
  );
};

export default Room;