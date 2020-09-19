import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import socket, { SocketEvents } from '../socket';

const Queue = ({ user, queueUsers, setQueueUsers, inQueue, setInQueue }) => {

  const handleJoinQueue = (e) => {
    socket.emit(SocketEvents.ENQUEUE, { user, roomId: user.roomId }, (data) => {
      console.log('acknowledged from ENQUEU event', data.user);
      setQueueUsers([...queueUsers, data.user]);
      setInQueue(true);
    });
  };

  return (
    <div>
      <h2>Queue</h2>
      {!inQueue ?
        <Button onClick={handleJoinQueue}>Join Queue</Button>
        :
        null
      }
      <ol>
        {queueUsers.map(qu =>
          <li key={qu.id}>{qu.name}</li>
        )}
      </ol>
    </div>
  );
};

export default Queue;

