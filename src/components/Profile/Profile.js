import { React, useContext, useEffect, useState } from "react";
import RerouteToLogin from "../RerouteToLogin/RerouteToLogin";
import { UserContext } from "../../contexts/UserContext";

import Post from "../../components/Post/Post";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [posts, setPosts] = useState([]);
  const context = useContext(UserContext);
  const navigate = useNavigate();

  async function getPosts() {
    if (context.isLoggedIn) {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/allposts?username=${context.username}`
      );
      const json = await res.json();
      setPosts(json);
    }
  }

  function displayPosts() {
    const arr = [];
    for (let i = 0; i < posts.length; i++) {
      //check if post exists
      if (posts[i]) {
        const { id, title, author, content, date, tags } = posts[i];
        arr.push(
          <Post
            key={i}
            postID={id}
            title={title}
            author={author}
            content={content}
            date={date}
            tags={tags}
          />
        );
      }
    }
    return arr;
  }

  function signOut() {
    //set context and then navigate to home
    context.setIsLoggedIn(false);
    context.setUsername("guest");
    navigate("/");
  }

  useEffect(() => {
    //get all the posts for this user and assign to posts
    getPosts();
  });

  if (!context.isLoggedIn) {
    return RerouteToLogin();
  } else {
    return (
      <div className="Profile">
        <div className="stage">
          <div id="signOutDiv">
            <h2>Hi, {context.username}</h2>
            <button id="signOutButton" onClick={signOut}>
              Sign out{" "}
            </button>
          </div>
          <h2>You have {posts.length} posts</h2>
          <div>{displayPosts()}</div>
        </div>
      </div>
    );
  }
}

export default Profile;
