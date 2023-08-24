import { React, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import RerouteToLogin from "../RerouteToLogin/RerouteToLogin";

function Create() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const previousContent = useRef("");

  const context = useContext(UserContext);

  useEffect(() => {
    previousContent.current = content;
  }, [content]);

  function get(id) {
    return document.getElementById(id);
  }

  function sendData() {
    console.log(context.username);
    const title = get("title");
    const author = context.username;
    const content = get("content");
    const tags = get("tags");

    if (content.value === "") {
      get("error").innerHTML = "Content field is required.";
      content.style.outline = "2px solid red";
      return;
    }

    const send = {
      title: title.value.replaceAll("'", "''"),
      author: author.replaceAll("'", "''"),
      content: content.value.replaceAll("'", "''").trim(),
      tags: tags.value.replaceAll("'", "''"),
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/newpost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(send),
    })
      .then((res) => res.text())
      .then((res) => console.log(res))
      .then(() => {
        navigate("/");
      });
  }

  function checkContent() {
    const contentValue = get("content").value;
    const count = contentValue.split(/\S+/).length - 1;
    if (count > 250) {
      get("content").value = previousContent.current.trim();
    } else if (count === 250) {
      get("content").value = get("content").value.trim();
      setContent(contentValue);
    } else if (count < 250) {
      setContent(contentValue);
    }
  }
  if (context.isLoggedIn) {
    return (
      <div className="Create">
        <h2>Create a new post here!</h2>
        <div className="form">
          <form>
            <div>
              <label>Title: </label> <input id="title" type="text" />
            </div>
            {/* <div>
            <label>Author: </label> <input id="author" type="text" />
          </div> */}
            <div>
              <div id="contentCount">
                <label>Content: </label>
                <p id="count">
                  ({content.split(/\S+/).length - 1}/250<br></br>words)
                </p>
              </div>
              <textarea
                content={content}
                onChange={checkContent}
                id="content"
                type="text"
              />
            </div>
            <div>
              <label>Tags: </label>
              <input id="tags" type="text" />
            </div>
            <div className="button">
              <p id="error"></p>
              <input
                id="postButton"
                type="button"
                value="Post"
                onClick={sendData}
              />
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <RerouteToLogin />;
  }
}

export default Create;
