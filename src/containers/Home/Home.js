import { React, Component } from "react";

//Components
import Post from "../../components/Post/Post";

class Home extends Component {
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
          const { title, author, content, date, tags } = this.state.posts[i];
          arr.push(
            <Post
              key={i}
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

  componentDidMount() {
    this.getPosts();
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    return (
      <div className="Home">
        <h1>Welcome to ThoughtServe</h1>
        <p>
          This is a community where you can share your thoughts without being
          judged!
        </p>
        <div>{this.displayPosts()}</div>
        <div id="pageNav">
          <button onClick={this.nextPage}>Load more</button>
        </div>
      </div>
    );
  }
}

export default Home;
