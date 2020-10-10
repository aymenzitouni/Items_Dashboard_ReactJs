import React from "react";

const Navbar = props => {
  return (
    <div class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">
        Navbar
      </a>
      <span className="badge badge-pill badge-primary">
        {props.totalCounters}
      </span>
    </div>
  );
};

export default Navbar;
