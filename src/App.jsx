import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import ShowPost from "./components/Posts/showPosts/ShowPosts";
import Navbar from "./components/Navbar/Navbar";
import Chat from "./components/Chat/Chat";
import {jwtDecode} from "jwt-decode"; 

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        setUser({ uid: decoded.user_id, email: decoded.email }); 
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  return (
    <div className="App">
      {!user ? (
        <Login /> 
      ) : (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/posts" element={<ShowPost />} />
            <Route path="/chat" element={<Chat user={user} />} /> 
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
