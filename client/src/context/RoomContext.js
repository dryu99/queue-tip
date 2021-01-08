import React, { createContext, useState } from 'react';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  console.log('room provider');
  const [room, setRoom] = useState(null);

  const contextValue = {
    room,
    setRoom
  };

  return (
    <RoomContext.Provider value={contextValue}>
      {children}
    </RoomContext.Provider>
  );
};
