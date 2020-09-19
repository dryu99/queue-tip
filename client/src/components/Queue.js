import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const Queue = ({ user, queueUsers, setQueueUsers }) => {

  const handleJoinQueue = (e) => {
    setQueueUsers([...queueUsers, user]);
  };

  return (
    <div>
      <h2>Queue</h2>
      <ol>
        {queueUsers.map(qu =>
          <li key={qu.id}>{qu.name}</li>
        )}
      </ol>

      <Button onClick={handleJoinQueue}>Join Queue</Button>
    </div>
  );
};

export default Queue;

