import React, { createContext, useMemo, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // user:  { id: null, name: null, isAdmin: false }
  const [user, setUser] = useState({ name: null, roomId: null, isAdmin: false });

  const providerValue = useMemo(() => ({
    user,
    setUser
  }), [user]);

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
