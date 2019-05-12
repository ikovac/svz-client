import React from "react";
import { StaticQuery, graphql } from "gatsby";
import NavItem from "./NavItem";

const Nav = ({ closeMenu }) => {
  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              menuLinks {
                name
                path
              }
            }
          }
        }
      `}
      render={data => (
        <nav id="main-menu">
          <ul>
            {data &&
              data.site.siteMetadata.menuLinks.map(item => {
                return <NavItem closeMenu={closeMenu} key={item.name} {...item} />;
              })}
          </ul>
        </nav>
      )}
    />
  );
};

export default Nav;
