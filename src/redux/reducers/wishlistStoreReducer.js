import { WISHLIST_NOT_VALID, WISHLIST_VALID } from "../actions/actionTypes";

const initialState = {
  valid: false,
  items: [],
};

export default function wishlistStoreReducer(state = initialState, action) {
  switch (action.type) {
    case WISHLIST_NOT_VALID:
      return {
        ...state,
        valid: false,
      };
    case WISHLIST_VALID:
      return {
        ...state,
        valid: true,
        items: action.payload,
      };
    default:
      return state;
  }
}
