import { React, useEffect } from "react";

import { Link } from "react-router-dom";

function DropDown(props) {
  useEffect(() => {
    const dropdown = document.getElementsByClassName("DropDown")[0];
    const listener = dropdown.addEventListener("click", () => {
      props.toggler();
    });

    return () => {
      dropdown.removeEventListener("click", listener);
    };
  });
  return (
    <div className="DropDown">
      <Link className="droplink" to={"/"}>
        HOME
      </Link>
      <Link className="droplink" to={"/create"}>
        CREATE POST
      </Link>
      <Link className="droplink" to={"/profile"}>
        PROFILE
      </Link>
    </div>
  );
}

export default DropDown;
