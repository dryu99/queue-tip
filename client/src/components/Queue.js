import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import socket, { SocketEvents } from '../socket';

const Queue = ({ user, queueUsers }) => {
  return (
    <div className="border border-dark">
      <h4>Queue</h4>
      <ol>
        {queueUsers.map(qu =>
          <li key={qu.id}>
            {user.name === qu.name ? <b>{qu.name}</b> : qu.name}
          </li>
        )}
      </ol>
    </div>
  );
};

export default Queue;

