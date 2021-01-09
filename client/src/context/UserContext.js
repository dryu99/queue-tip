import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  console.log('user provider');
  // user:  { name: null, roomId: null, isAdmin: false }
  const [user, setUser] = useState({ name: null, roomId: null, isAdmin: false });

  const providerValue = {
    user,
    setUser
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
