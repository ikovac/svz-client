import React, { Component } from "react";
import { document, window, exists } from "browser-monads";

import { FaHeart, FaPlus, FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";

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

  handleAddToWishlist = () => {
    const { articleID } = this.props;
    console.log("ARTICLE ID: ", articleID);
    Swal.fire({
      type: "success",
      title: "Dodano u odabranu listu",
      showConfirmButton: false,
      timer: 2000,
    });

    /* Swal.fire({
      type: 'success',
      toast: true,
      position: 'top-end',
      title: 'Artkl je uklonjen iz odabrane liste',
      showConfirmButton: false,
      timer: 2000
    }); */
  };

  render() {
    const { items } = this.props;
    return (
      <div className="usluge-nav-wrapper">
        <div className="usluge-nav">
          <div>
            {items.map(item => (
              <div key={item.label} className="usluge-nav-element">
                <a onClick={() => this.handleNavBarElementClick(item.linkId)}>
                  <span className="usluge-nav-element__icon">{item.icon}</span>
                  <span className="usluge-nav-element__label">
                    {item.label}
                  </span>
                </a>
              </div>
            ))}

            <div className="usluge-nav-element add-to-wishlist">
              <a onClick={this.handleAddToWishlist}>
                <span className="usluge-nav-element__icon">
                  <FaHeart />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UslugeNavBar;
