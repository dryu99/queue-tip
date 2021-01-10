import React, { useState, useEffect, useContext } from 'react';
import socket, { SocketEvents } from '../socket';
import logger from '../utils/logger';
import { Button } from './Common';
import styled from 'styled-components';

const AdminRoomView = ({ room, queue, userCount }) => {

  const isQueueEmpty = queue.length === 0;

  const dequeue = (e) => {
    socket.emit(SocketEvents.DEQUEUE, { roomId: room.id }, (res) => {
      const { error } = res;
      console.log(res);
      error && logger.error(error);
    });
  };

  return (
    <div>
      <p>{userCount} users currently in room</p>
      <ol>
        {queue.map(u =>
          <li key={u.id}>{u.name}</li>
        )}
      </ol>

      <Button disabled={isQueueEmpty} onClick={dequeue}>Dequeue</Button>
    </div>
  );
};

export default AdminRoomView;