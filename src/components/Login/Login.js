import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function Login() {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  function get(id) {
    return document.getElementById(id);
  }

  function sendData() {
    const username = get("username");
    const password = get("password");

    const send = {
      username: username.value.replaceAll("'", "''").trim(),
      password: password.value.trim(),
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(send),
    })
      .then((res) => {
        if (res.status === 200) {
          // navigate to home after saving the logged in state
          context.setIsLoggedIn(true);
          context.setUsername(username.value.replaceAll("'", "''").trim());
          navigate("/");
          return false;
        }
        if (res.status === 401) {
          return res.text();
        }
      })
      .then((res) => {
        if (res) {
          const error = get("error");
          if (JSON.parse(res) === "Username does not exist.") {
            error.innerHTML = "Oops! Username does not exist.";
          } else {
            error.innerHTML = "Wrong password!";
          }
          setTimeout(() => {
            error.innerHTML = "";
          }, 3000);
        }
      });
  }

  return (
    <div className="Login">
      <h2>Login here!</h2>
      <div className="form">
        <form>
          <div>
            <label>Username: </label> <input id="username" type="text" />
          </div>

          <div>
            <label>Password: </label>
            <input id="password" type="password" />
          </div>
          <div className="buttonDiv">
            <input
              id="actionButton"
              type="button"
              value="Login"
              onClick={sendData}
            />
            <p id="error"> </p>
          </div>
          <div className="redirectDiv">
            <p>
              New here?{" "}
              <Link className="link" to={"/signup"}>
                Click here
              </Link>{" "}
              to sign up!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
