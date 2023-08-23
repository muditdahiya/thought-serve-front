import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function SignUp() {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  function get(id) {
    return document.getElementById(id);
  }

  function clearErrors() {
    const username = get("username");
    const password = get("password");
    const error = get("error");
    setTimeout(() => {
      error.innerHTML = "";
      username.style.outline = "0px";
      password.style.outline = "0px";
    }, 3000);
  }

  function sendData() {
    const username = get("username");
    const password = get("password");
    const error = get("error");

    if (username.value === "") {
      username.style.outline = "2px solid red";
      error.innerHTML = "Username cannot be empty!";
      clearErrors();
    } else if (password.value === "") {
      password.style.outline = "2px solid red";
      error.innerHTML = "Password cannot be empty!";
      clearErrors();
    } else {
      const send = {
        username: username.value.replaceAll("'", "''").trim(),
        password: password.value.trim(),
      };

      fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(send),
      }).then((res) => {
        if (res.status === 200) {
          // login the user after making new entry
          context.setIsLoggedIn(true);
          context.setUsername(username.value.replaceAll("'", "''").trim());
          // navigate to home after saving the logged in state
          navigate("/");
        }
        if (res.status === 401) {
          username.style.outline = "2px solid red";
          error.innerHTML = "Sorry, the username was already taken!";
          clearErrors();
        }
      });
    }
  }

  return (
    <div className="SignUp">
      <h2>Sign up here!</h2>
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
              value="Sign Up"
              onClick={sendData}
            />
            <p id="error"> </p>
          </div>
          <div className="redirectDiv">
            <p>
              Already a member?{" "}
              <Link className="link" to={"/login"}>
                Click here
              </Link>{" "}
              to login now!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
