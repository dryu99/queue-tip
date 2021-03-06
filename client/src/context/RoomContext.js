import React, { createContext, useMemo, useState } from 'react';

export const RoomContext = createContext();

// TODO consider simplifying state to just room
export const RoomProvider = ({ children }) => {
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
