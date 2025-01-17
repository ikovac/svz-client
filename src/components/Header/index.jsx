import React, { Component } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import { connect } from "react-redux";
import cn from "classnames";
// import "../../../node_modules/hamburgers/_sass/hamburgers/hamburgers.scss";

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
    const { wishlistItems } = this.props;
    const navClass = isOpen ? "open" : "closed";
    const isActive = isOpen ? "is-active" : null;
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
                  aria-label="Menu"
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
                    <Link to="/odabrana-lista" title="odabrana lista" aria-label="Odabrana lista">
                      <FaHeart className="header-top__wishlist-icon" />
                      <span className="badge" id="items-count">
                        {wishlistItems.length}
                      </span>
                    </Link>
                  </div>
                  <div className="header-top__search-icon">
                    <Link to="/trazilica" title="tražilica" aria-label="Tražilica">
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

const mapStateToProps = state => ({ wishlistItems: state.wishlist.items });

export default connect(
  mapStateToProps,
  null
)(Header);
