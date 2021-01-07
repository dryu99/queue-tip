import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  console.log('user provider');
  const [user, setUser] = useState({ name: null, isAdmin: false });

  const contextValue = {
    user,
    setUser
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
