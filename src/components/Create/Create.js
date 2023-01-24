import { React } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  function get(id) {
    return document.getElementById(id);
  }

  function sendData() {
    console.log("button pressed");
    const title = get("title");
    const author = get("author");
    const content = get("content");
    const tags = get("tags");

    if (content.value === "") {
      get("error").innerHTML = "Content field is required.";
      content.style.outline = "2px solid red";
      return;
    }

    const send = {
      title: title.value.replaceAll("'", "''"),
      author: author.value.replaceAll("'", "''"),
      content: content.value.replaceAll("'", "''"),
      tags: tags.value.replaceAll("'", "''"),
    };

    console.log(send.title);

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

  return (
    <div className="Create">
      <h2>Create a new post here!</h2>
      <div className="form">
        <form>
          <div>
            <label>Title: </label> <input id="title" type="text" />
          </div>
          <div>
            <label>Author: </label> <input id="author" type="text" />
          </div>
          <div>
            <label>Content: </label>
            <textarea id="content" type="text" />
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
}

export default Create;
