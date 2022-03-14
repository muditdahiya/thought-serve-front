import { React, Component } from "react";
import "./SignInForm.css";

class SignInForm extends Component {
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
      const email = get("email");
      const password = get("password");

      const send = {
        email: email.value,
        hash: password.value,
      };

      fetch(`${process.env.REACT_APP_BACKEND_URL}/signin`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(send),
      })
        .then((res) => res.text())
        .then((res) => console.log(res));
    }

    return (
      <div className="SignInForm">
        <h2>Sign In</h2>
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
          Sign In
        </button>
      </div>
    );
  }
}

export default SignInForm;
