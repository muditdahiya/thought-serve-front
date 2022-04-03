import { React } from "react";

import { Link } from "react-router-dom";

function DropDown() {
  return (
    <div className="DropDown">
      <Link className="droplink" to={"/"}>
        HOME
      </Link>
      <Link className="droplink" to={"/create"}>
        CREATE POST
      </Link>
    </div>
  );
}

export default DropDown;
