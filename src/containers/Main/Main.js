import { React, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Create from "../../components/Create/Create";
import PostID from "../../components/PostID/PostID";
import Profile from "../../components/Profile/Profile";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";

import Home from "../Home/Home";

import { UserContext } from "../../contexts/UserContext";

function Main() {
  const [username, setUsername] = useState("guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userObject = {
    username: username,
    setUsername: setUsername,
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
  };
  return (
    <div className="Main">
      <UserContext.Provider value={userObject}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="posts/:id" element={<PostID />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default Main;
