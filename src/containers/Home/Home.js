import { React, Component } from "react";
import { UserContext } from "../../contexts/UserContext";

//Components
import Post from "../../components/Post/Post";

class Home extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      ready: false,
      page: 1,
    };
  }

  getPosts = async () => {
    if (!this.state.ready) {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/allposts`);
      const json = await res.json();
      this.setState({ posts: json, ready: true });
    }
  };

  displayPosts = () => {
    if (this.state.ready) {
      const arr = [];
      for (let i = 0; i < this.state.page * 5; i++) {
        //check if post exists
        if (this.state.posts[i]) {
          const { id, title, author, content, date, tags } =
            this.state.posts[i];
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
    } else {
      return (
        <div>
          <p>Please wait while the posts load :)</p>
        </div>
      );
    }
  };

  displayLoadMore = () => {
    if (!this.state.ready) {
      return;
    } else {
      if (this.state.posts.length > this.state.page * 5) {
        return (
          <div id="pageNav">
            <button id="loadMore" onClick={this.nextPage}>
              Load more
            </button>
          </div>
        );
      }
    }
  };

  componentDidMount() {
    this.getPosts();
  }

  username = () => {
    return this.context.username;
  };

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    return (
      <div className="Home">
        {!this.context.isLoggedIn ? (
          <h1>Welcome to ThoughtServe</h1>
        ) : (
          <h1>Hi {this.username()}, welcome to ThoughtServe</h1>
        )}

        <p>
          This is a community where you can share your thoughts without being
          judged!
        </p>
        <div className="posts">
          {this.displayPosts()}
          {this.displayLoadMore()}
        </div>
      </div>
    );
  }
}

export default Home;
