import React, { Component } from "react";

import { document, window, exists } from "browser-monads";

import AddToWishlistBtn from "../AddToWishlistBtn";

class UslugeNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNavBarElementClick = id => {
    if (!exists(window) && !exists(document)) {
      return;
    }

    let el = document.getElementById(id);
    window.scroll({
      left: 0,
      top: el.offsetTop - 85,
      behavior: "smooth",
    });
  };

  render() {
    const { items, articleID } = this.props;

    return (
      <div className="usluge-nav-wrapper">
        <div className="row usluge-nav">
          {items.map(item => (
            <button
              key={item.label}
              className="usluge-nav-element columns small-2"
              onClick={() => this.handleNavBarElementClick(item.linkId)}
            >
              <span className="usluge-nav-element__icon">{item.icon}</span>
              <span className="usluge-nav-element__label">{item.label}</span>
            </button>
          ))}

          <AddToWishlistBtn articleID={articleID} />
        </div>
      </div>
    );
  }
}

export default UslugeNavBar;
