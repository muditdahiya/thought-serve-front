import { React, Component } from "react";
import { Link } from "react-router-dom";
import menu from "./menu.svg";
import cross from "./cross.svg";
import DropDown from "../../components/DropDown/DropDown";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="left">
          <h2>ThoughtServe</h2>
          <p className="message">Your favourite community</p>
        </div>

        <nav className="right">
          <Link className="link" to={"/"}>
            HOME
          </Link>

          <Link className="link" to={"/create"}>
            CREATE POST
          </Link>

          <img src={menu} alt="hamburger menu" className="menu"></img>
          <img src={cross} alt="close menu" className="cross"></img>

          <DropDown className="DropDown" />
        </nav>
      </div>
    );
  }
}

export default Header;
