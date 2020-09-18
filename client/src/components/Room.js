import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import socket, { SocketEvents } from '../socket';

import SignInPopup from './SignInPopup';

const Room = ({ room, isAdmin, user, setUser }) => {
  const [users, setUsers] = useState([]);

  // subscribe to relevant socket events
  useEffect(() => {
    // when someone else joins, add them to user list
    socket.on(SocketEvents.NEW_USER_JOIN, ({ newUser }) => {
      console.log('received JOIN event', newUser);
      setUsers([...users, newUser]);
    });

    socket.on(SocketEvents.LEAVE, ({ leftUser }) => {
      console.log('received LEAVE event', leftUser);
      setUsers(users.filter(u => u.id !== leftUser.id));
    });

    // on component unmount, disconnect and turn off socket
    return () => {
      socket.emit(SocketEvents.DISCONNECT);
      socket.off();
    };
  }, [users]);

  return (
    <Container>
      {room ?
        <React.Fragment>
          <h1>Room: {room.name}</h1>
          <h2>Users:</h2>
          <ul>
            {users.map(u =>
              <li key={u.id}>{u.name}</li>
            )}
          </ul>
          <SignInPopup
            room={room}
            setUser={setUser}
            users={users}
            setUsers={setUsers}
          />
        </React.Fragment>
        :
        <h1>Sorry room doesn't exist...</h1>
      }
    </Container>
  );
};

export default Room;