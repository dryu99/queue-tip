import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

// needed to avoid prematurely ending notification timeouts
let timeoutId = null;

export const NotificationProvider = ({ children }) => {
  console.log('notification provider');
  const [notification, setNotification] = useState(null);

  const triggerNotification = (newNotification) => {
    setNotification(newNotification);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      setNotification(null);
    }, 10000);
  };

  const providerValue = {
    notification,
    setNotification,
    triggerNotification
  };

  return (
    <NotificationContext.Provider value={providerValue}>
      {children}
    </NotificationContext.Provider>
  );
};
