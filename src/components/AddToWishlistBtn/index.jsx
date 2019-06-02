import React, { Component } from "react";
import { connect } from "react-redux";

import { addToWishlist } from "../../redux/actions/wishlistAction";
import { addToWishlistCookie } from "../../utils/wishlistCookieUtils";

import { FaHeart, FaPlus, FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";

class AddToWishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAddToWishlist = () => {
    const { articleID, addToWishlist } = this.props;

    addToWishlistCookie(articleID);
    addToWishlist(articleID);

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
    const { articleID, wishlistItems } = this.props;
    return (
      <button
        className="usluge-nav-element add-to-wishlist columns small-2"
        onClick={this.handleAddToWishlist}
        title="dodaj u odabranu listu"
      >
        <span className="usluge-nav-element__icon">
          <FaHeart />
          {!wishlistItems.includes(articleID) && (
            <span className="usluge-nav-element__icon-plus">
              <FaPlus />
            </span>
          )}
          {wishlistItems.includes(articleID) && (
            <span className="usluge-nav-element__icon-check">
              <FaCheck />
            </span>
          )}
        </span>
      </button>
    );
  }
}

const mapStateToProps = state => ({ wishlistItems: state.wishlist.items });

export default connect(
  mapStateToProps,
  { addToWishlist }
)(AddToWishlist);
