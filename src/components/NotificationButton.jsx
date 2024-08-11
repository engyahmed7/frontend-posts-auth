import React, { useEffect } from 'react';
import { getFCMToken } from '../firebase-config';

const NotificationButton = () => {
  const requestPermission = async () => {
    console.log('Requesting permission...');
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        await getFCMToken();
      } else {
        console.log('Notification permission denied.');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return <button onClick={requestPermission}>Enable Notifications</button>;
};

export default NotificationButton;
