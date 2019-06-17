import { navigate } from "gatsby";
import { connect } from "react-redux";

import { addToWishlist, emptyWishlist } from "../redux/actions/wishlistAction";
import { makeWishlistUnvalid } from "../redux/actions/wishlistStoreActions";
import {
  addToWishlistCookie,
  deleteWishlistCookie,
} from "../utils/wishlistCookieUtils";

import { exists, window } from "browser-monads";

import queryString from "query-string";

const savedWishlist = ({
  location,
  addToWishlist,
  makeWishlistUnvalid,
  emptyWishlist,
}) => {
  emptyWishlist();
  deleteWishlistCookie();
  makeWishlistUnvalid();

  if (!location.search || !location.search.length) {
    return null;
  }

  const { nids } = queryString.parse(location.search);

  if (nids || nids.length) {
    const nidsArr = nids.split(",");
    for (let nid of nidsArr) {
      addToWishlist(Number(nid));
      addToWishlistCookie(Number(nid));
    }
  }

  if (exists(window)) {
    navigate("/odabrana-lista");
  }
  return null;
};

export default connect(
  null,
  { addToWishlist, emptyWishlist, makeWishlistUnvalid }
)(savedWishlist);
