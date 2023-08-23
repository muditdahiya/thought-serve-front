import { React } from "react";
import { Link } from "react-router-dom";

function RerouteToLogin() {
  return (
    <div className="RerouteToLogin">
      <h1 className="emoji">&#9785;</h1>
      <h1>
        Oops! <br />
        You need to be logged in to continue here.
      </h1>
      <h2>
        <Link className="link" to={"/login"}>
          Click here
        </Link>{" "}
        to login!
      </h2>
      <h2>
        <Link className="link" to={"/signup"}>
          Click here
        </Link>{" "}
        to signup!
      </h2>
    </div>
  );
}

export default RerouteToLogin;
