// notification-hook.js
import { useState, useEffect } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState(() => {
    const storedNotification = sessionStorage.getItem('notification');
    return storedNotification ? JSON.parse(storedNotification) : null;
  });

  useEffect(() => {
    if (notification) {
      sessionStorage.setItem('notification', JSON.stringify(notification));
    }
  }, [notification]);

  return [notification, setNotification];
};

export default useNotification;
