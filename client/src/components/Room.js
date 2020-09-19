import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import socket, { SocketEvents } from '../socket';

import SignInPopup from './SignInPopup';
import Queue from './Queue';

const Room = ({ room, isAdmin, user, setUser }) => {
  const [users, setUsers] = useState([]);
  const [queueUsers, setQueueUsers] = useState([]);
  const [inQueue, setInQueue] = useState(false);

  // subscribe to relevant socket events
  useEffect(() => {
    if (room) {
      // when another user joins, add them to user list
      socket.on(SocketEvents.NEW_USER_JOIN, ({ newUser }) => {
        console.log('received JOIN event', newUser);
        setUsers([...users, newUser]);
      });

      // when another user leaves, remove them from user list
      socket.on(SocketEvents.LEAVE, ({ leftUser }) => {
        console.log('received LEAVE event', leftUser);
        setUsers(users.filter(u => u.id !== leftUser.id));
        setQueueUsers(queueUsers.filter(qu => qu.id !== leftUser.id));
      });

      // when another user joins queue, add them to queue list
      socket.on(SocketEvents.ENQUEUE, ({ newQueueUser }) => {
        console.log('received ENQUEUE event', newQueueUser);
        setQueueUsers([...queueUsers, newQueueUser]);
      });

      // when another user joins queue, add them to queue list
      socket.on(SocketEvents.DEQUEUE, ({ dequeuedUser }) => {
        console.log('received DEQUEUE event', dequeuedUser);
        setQueueUsers(queueUsers.filter(qu => qu.id !== dequeuedUser.id));
      });
    }

    // on component unmount, disconnect and turn off socket
    return () => {
      socket.emit(SocketEvents.DISCONNECT);
      socket.off();
    };
  }, [users, queueUsers]);

  return (
    <Container>
      {room ?
        <React.Fragment>
          <h1>Room: {room.name}</h1>
          <h2>Users:</h2>
          <ul>
            {users.map(u =>
              <li key={u.id}>
                {user.name === u.name ? <b>{u.name}</b> : u.name}
              </li>
            )}
          </ul>
          <Queue
            user={user}
            room={room}
            queueUsers={queueUsers}
            setQueueUsers={setQueueUsers}
            inQueue={inQueue}
            setInQueue={setInQueue}
          />
          <SignInPopup
            room={room}
            setUser={setUser}
            users={users}
            setUsers={setUsers}
            queueUsers={queueUsers}
            setQueueUsers={setQueueUsers}
          />
        </React.Fragment>
        :
        <h1>Sorry room doesn't exist...</h1>
      }
    </Container>
  );
};

export default Room;