import { WISHLIST_NOT_VALID, WISHLIST_VALID } from "./actionTypes";

export function makeWishlistUnvalid() {
  return dispatch => {
    dispatch({ type: WISHLIST_NOT_VALID });
  };
}

export function makeWishlistValid(wishlistItems) {
  return dispatch => {
    dispatch({ type: WISHLIST_VALID, payload: wishlistItems });
  };
}
