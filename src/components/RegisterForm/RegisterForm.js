import { React, Component } from "react";
import "./RegisterForm.css";

class RegisterForm extends Component {
  render() {
    function get(id) {
      return document.getElementById(id);
    }

    function showPassword() {
      const ele = get("password");

      if (ele.type === "password") {
        ele.type = "text";
      } else {
        ele.type = "password";
      }
    }

    function sendData() {
      const name = get("name");
      const email = get("email");
      const password = get("password");

      const send = {
        name: name.value,
        email: email.value,
        hash: password.value,
      };

      fetch("http://localhost:3001/newuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(send),
      })
        .then((res) => res.text())
        .then((res) => console.log(res));
    }

    return (
      <div className="RegisterForm">
        <h2>Register</h2>
        <label>Name: </label>
        <input id="name" type={"text"} /> <br />
        <label>Email: </label>
        <input id="email" type="email" /> <br />
        <label>Password: </label>
        <input id="password" type="password" /> <br />
        <div>
          <label> Show Password</label>
          <input type={"checkbox"} onClick={showPassword}></input>
          <br />
        </div>
        <button className="RegisterButton" onClick={sendData}>
          Register
        </button>
      </div>
    );
  }
}

export default RegisterForm;
