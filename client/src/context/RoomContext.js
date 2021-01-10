import React, { createContext, useMemo, useState } from 'react';

export const RoomContext = createContext();

// TODO feels redundant to keep track of both users and queue on client, maybe just keep track of queue ids?
export const RoomProvider = ({ children }) => {
  console.log('room provider');
  const [room, setRoom] = useState(null);
  const [queue, setQueue] = useState([]);
  const [userCount, setUserCount] = useState(0);

  const providerValue = useMemo(() => ({
    room,
    queue,
    userCount,
    setRoom,
    setQueue,
    setUserCount
  }), [queue, room, userCount]);

  return (
    <RoomContext.Provider value={providerValue}>
      {children}
    </RoomContext.Provider>
  );
};
