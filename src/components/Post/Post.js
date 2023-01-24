import { React, Component } from "react";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { postID, title, author, content, date, tags } = this.props;
    //TITLE
    if (title === "") {
      title = "No Title";
    }
    //AUTHOR
    if (author === "") {
      author = "Anonymous";
    }
    //DATE
    let time =
      date.substring(date.indexOf("T") + 1, date.indexOf("Z")).substring(0, 5) +
      " UTC";
    date = date.substring(0, date.indexOf("T"));
    //TAGS
    tags = "#" + tags.split(" ").join(" #");
    if (tags === "#") {
      tags = "";
    }

    const copyLink = async () => {
      const url = `${process.env.REACT_APP_FRONTEND_URL}/posts/${postID}`;

      navigator.clipboard.writeText(url);

      document.getElementById("copiedMessage " + postID).innerHTML =
        "Copied post URL to clipboard!";

      setTimeout(() => {
        document.getElementById("copiedMessage " + postID).innerHTML = "";
      }, 1000);
    };

    return (
      <div className="Post">
        <div>
          <p id="title">{title}</p>
          <p id="author">by {author}</p>
          <p id="date">
            on {date} at {time}
          </p>
          <p id="tags">{tags}</p>
          <p id="content">{content}</p>
          <div id="buttons">
            <p id={`copiedMessage ${postID}`}></p>
            <button id="shareButton" onClick={copyLink}>
              Share
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
