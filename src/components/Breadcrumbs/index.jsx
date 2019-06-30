import React from "react";

import { FaHome } from "react-icons/fa";
import { Link } from "gatsby";

const Breadcrumbs = ({ items = [], current = null }) => {
  return (
    <div className="breadcrumbs">
      <Link to="/" title="Početna" className="breadcrumb-element home">
        <FaHome />
      </Link>

      {items.map(item => (
        <Link
          className="breadcrumb-element"
          to={item.link}
          title={item.label}
          key={item.label}
        >
          {item.label}
        </Link>
      ))}

      {current && <p className="breadcrumb-element active">{current}</p>}
    </div>
  );
};

export default Breadcrumbs;
