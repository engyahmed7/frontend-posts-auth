import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import ShowPost from './components/Posts/showPosts/ShowPosts';
import Navbar from './components/Navbar/Navbar';
import { messaging, getToken, onMessage } from './firebase-config';

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // navigator.serviceWorker.getRegistrations().then(registrations => {
      //   registrations.forEach(registration => {
      //     registration.unregister();
      //   });
      // });
    
      // caches.keys().then(cacheNames => {
      //   cacheNames.forEach(cacheName => {
      //     caches.delete(cacheName);
      //   });
      // });
    
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
    

    const fetchToken = async () => {
      try {
        console.log('Registration Token:');
        const currentToken = await getToken(messaging, {
          vapidKey: 'BO8XdKnjjcT94hECW3I_L2zfBXryUTyJNl_H-j4rpaKSfR3XL2gzbVtjkq7k3tdMzuoRDFGUzXSLuZibtAYx6F8',
        });
        if (currentToken) {
          console.log('Registration Token:', currentToken);
          await fetch('/api/save-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: currentToken }),
          });
        } else {
          console.log('No registration token available.');
        }
      } catch (err) {
        console.log('An error occurred while retrieving token. ', err);
      }
    };

    fetchToken();

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      const { title, body } = payload.notification;
      new Notification(title, {
        body: body,
        icon: '/firebase-logo.png',
      });
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<ShowPost />} />
      </Routes>
    </Router>
  );
}

export default App;
