import React, { createContext, useMemo, useState } from 'react';

export const RoomContext = createContext();

// TODO feels redundant to keep track of both users and queue on client, maybe just keep track of queue ids?
export const RoomProvider = ({ children }) => {
  console.log('room provider');
  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState([]);
  const [queue, setQueue] = useState([]);

  const providerValue = useMemo(() => ({
    room,
    users,
    queue,
    setRoom,
    setUsers,
    setQueue
  }), [queue, room, users]);

  return (
    <RoomContext.Provider value={providerValue}>
      {children}
    </RoomContext.Provider>
  );
};
