import React, { createContext, useMemo, useState } from 'react';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  console.log('room provider');
  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState([]);
  const [queue, setQueue] = useState([]);

  const providerValue = {
    room,
    users,
    queue,
    setRoom,
    setUsers,
    setQueue
  };

  return (
    <RoomContext.Provider value={providerValue}>
      {children}
    </RoomContext.Provider>
  );
};
