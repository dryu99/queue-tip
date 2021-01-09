import React, { createContext, useCallback, useMemo, useState } from 'react';

export const NotificationContext = createContext();

// needed to avoid prematurely ending notification timeouts
let timeoutId = null;

export const NotificationProvider = ({ children }) => {
  console.log('notification provider');
  const [notification, setNotification] = useState(null);

  const triggerNotification = useCallback((newNotification) => {
    setNotification(newNotification);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      setNotification(null);
    }, 10000);
  }, []);

  const providerValue = useMemo(() => ({
    notification,
    setNotification,
    triggerNotification
  }), [notification, triggerNotification]);

  return (
    <NotificationContext.Provider value={providerValue}>
      {children}
    </NotificationContext.Provider>
  );
};
