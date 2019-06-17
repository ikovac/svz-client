import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  EMPTY_WISHLIST,
} from "./actionTypes";

export function addToWishlist(article_id) {
  return (dispatch, getState) => {
    const {
      wishlist: { items },
    } = getState();
    if (items.includes(article_id)) {
      return;
    }
    dispatch({ type: ADD_TO_WISHLIST, payload: article_id });
  };
}

export function removeFromWishlist(article_id) {
  return (dispatch, getState) => {
    const {
      wishlist: { items },
    } = getState();
    if (!items.includes(Number(article_id))) {
      return;
    }
    dispatch({ type: REMOVE_FROM_WISHLIST, payload: Number(article_id) });
  };
}

export function emptyWishlist() {
  return dispatch => {
    dispatch({ type: EMPTY_WISHLIST });
  };
}
