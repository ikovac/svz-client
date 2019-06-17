import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, EMPTY_WISHLIST } from "../actions/actionTypes";
import { getWishlistCookieItems } from "../../utils/wishlistCookieUtils";

const initialState = {
  items: getWishlistCookieItems() ? getWishlistCookieItems() : [],
};

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        items: state.items.filter(item => item !== action.payload),
      };
    case EMPTY_WISHLIST:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
}
