import React, { Component } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import cn from "classnames";
import "../../../node_modules/hamburgers/_sass/hamburgers/hamburgers.scss";

import { FaHeart, FaSearch } from "react-icons/fa";

import Container from "../Container";
import Nav from "../Nav";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  closeMenu = () => {
    this.setState({ isOpen: false });
  };

  handleClick = event => {
    if (
      !this.menuToggle.contains(event.target) &&
      !this.nav.contains(event.target)
    ) {
      this.closeMenu();
    }
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
  }

  render() {
    const { isOpen } = this.state;
    const navClass = isOpen ? "open" : "closed";
    const isActive = isOpen ? 'is-active' : null;
    return (
      <StaticQuery
        query={graphql`
          {
            placeholderImage: file(relativePath: { eq: "logo.png" }) {
              childImageSharp {
                fluid(maxWidth: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        `}
        render={data => (
          <header id="header">
            <div className="header-top">
              <Container>
                <button
                  ref={node => (this.menuToggle = node)}
                  id="menu-toggle"
                  className={cn("hamburger hamburger--vortex", isActive)}
                  onClick={this.toggleMenu}
                >
                  <span className="hamburger-box">
                    <span className="hamburger-inner" />
                  </span>
                </button>
                <div className="header-top__site-branding">
                  <Link to="/">
                    <img
                      src={data.placeholderImage.childImageSharp.fluid.src}
                      alt="logo"
                    />
                    <h3>
                      SVE ZA <span className="cookie-font-span">vjencanje</span>{" "}
                      .HR
                    </h3>
                  </Link>
                </div>
                <div className="header-top__icons-block">
                  <div className="header-top__wishlist-block">
                    <Link to="/odabrana-lista" title="odabrana lista">
                      <FaHeart className="header-top__wishlist-icon" />
                      <span className="badge" id="items-count">
                        0
                      </span>
                    </Link>
                  </div>
                  <div className="header-top__search-icon">
                    <Link to="/trazilica" title="tražilica">
                      <FaSearch />
                    </Link>
                  </div>
                </div>
              </Container>
            </div>
            <div
              ref={node => (this.nav = node)}
              className={cn("header-bottom", navClass)}
            >
              <Nav closeMenu={this.closeMenu} />
            </div>
          </header>
        )}
      />
    );
  }
}

export default Header;
