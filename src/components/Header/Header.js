import { React, Component } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="left">
          <h2>ThoughtServe</h2>
          <p>Your favourite community</p>
        </div>

        <nav className="right">
          <Link className="link" to={"/"}>
            HOME
          </Link>

          <Link className="link" to={"/create"}>
            CREATE POST
          </Link>
        </nav>
      </div>
    );
  }
}

export default Header;
