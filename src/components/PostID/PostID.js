import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../Post/Post";

const PostID = () => {
  const params = useParams();
  const id = params.id;

  const [ready, setReady] = useState(false);
  const [post, setPost] = useState();

  const getPost = async () => {
    if (!ready) {
      // const res = await fetch(
      //   `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`
      // );
      const res = await fetch(`http://localhost:3001/posts/${id}`);
      const json = await res.json();
      setPost(json);
      setReady(true);
    }
  };

  const displayPost = () => {
    if (ready) {
      if (post.length === 0) {
        return <p>Sorry, no such post exists :(</p>;
      } else {
        console.log(post);
        return (
          <Post
            key={id}
            title={post[0].title}
            author={post[0].author}
            content={post[0].content}
            date={post[0].date}
            tags={post[0].tags}
          />
        );
      }
    } else {
      return (
        <div>
          <p>Please wait while the post loads :)</p>
        </div>
      );
    }
  };

  useEffect(() => {
    getPost();
  });

  return <div className="PostID">{displayPost()}</div>;
};

export default PostID;
