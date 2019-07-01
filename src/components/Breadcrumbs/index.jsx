import React, { Fragment } from "react";

import { FaHome } from "react-icons/fa";
import { Link } from "gatsby";

const Breadcrumbs = ({ items = [], current = null }) => {
  return (
    <div className="breadcrumbs">
      <span className="breadcrumb-element home">
        <Link to="/" title="Početna">
          <FaHome />
        </Link>
      </span>
      <span className="breadcrumb-delimiter">/</span>

      {items.map(item => (
        <Fragment  key={item.label}>
          <span className="breadcrumb-element">
            <Link to={item.link} title={item.label}>
              {item.label}
            </Link>
          </span>
          <span className="breadcrumb-delimiter">/</span>
        </Fragment>
      ))}

      {current && <span className="breadcrumb-element">{current}</span>}
    </div>
  );
};

export default Breadcrumbs;
