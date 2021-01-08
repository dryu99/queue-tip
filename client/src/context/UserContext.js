import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  console.log('user provider');
  // user:  { name: null, isAdmin: false }
  const [user, setUser] = useState(null);

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
