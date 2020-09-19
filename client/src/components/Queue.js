import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import socket, { SocketEvents } from '../socket';

const Queue = ({ user, room, queueUsers, setQueueUsers, inQueue, setInQueue }) => {

  const handleQueueToggle = (e) => {
    if (inQueue) {
      socket.emit(SocketEvents.DEQUEUE, { roomId: room.id }, ({ dequeuedUser }) => {
        console.log('acknowledged from DEQUEUE event', dequeuedUser);
        setQueueUsers(queueUsers.filter(qu => qu.id !== dequeuedUser.id));
        setInQueue(false);
      });
    } else {
      socket.emit(SocketEvents.ENQUEUE, { user, roomId: room.id }, (data) => {
        console.log('acknowledged from ENQUEUE event', data.user);
        setQueueUsers([...queueUsers, data.user]);
        setInQueue(true);
      });
    }
  };

  return (
    <div>
      <h2>Queue</h2>
      <Button onClick={handleQueueToggle}>
        {inQueue ? 'Leave Queue' : 'Join Queue'}
      </Button>
      <ol>
        {queueUsers.map(qu =>
          <li key={qu.id}>{qu.name}</li>
        )}
      </ol>
    </div>
  );
};

export default Queue;

