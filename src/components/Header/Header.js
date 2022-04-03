import { React, Component } from "react";
import { Link } from "react-router-dom";
import menu from "./menu.svg";
import cross from "./cross.svg";
import DropDown from "../../components/DropDown/DropDown";

class Header extends Component {
  render() {
    function toggleDropDown() {
      let drop = document.getElementsByClassName("DropDown")[0];
      let menu = document.getElementsByClassName("menu")[0];
      let cross = document.getElementsByClassName("cross")[0];

      if (drop.style.display === "flex") {
        drop.style.display = "none";
        cross.style.display = "none";
        menu.style.display = "block";
      } else {
        drop.style.display = "flex";
        cross.style.display = "block";
        menu.style.display = "none";
      }
    }

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

          <img
            src={menu}
            alt="hamburger menu"
            className="menu"
            onClick={toggleDropDown}
          ></img>
          <img
            src={cross}
            alt="close menu"
            className="cross"
            onClick={toggleDropDown}
          ></img>

          <DropDown className="DropDown" />
        </nav>
      </div>
    );
  }
}

export default Header;
