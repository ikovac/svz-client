import React from "react";
import { Link } from "gatsby";

const NavItem = ({ name, path, closeMenu }) => {
  return (
    <li>
      <Link to={path} title={name.toLowerCase()} activeClassName="is-active" onClick={closeMenu}>
        {name}
      </Link>
    </li>
  );
};

export default NavItem;
