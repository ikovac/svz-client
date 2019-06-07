import { combineReducers } from "redux";
import wishlistReducer from "./wishlistReducer";
import filtersReducer from "./filtersReducer";
import wishlistStoreReducer from "./wishlistStoreReducer";

const rootReducer = combineReducers({
  wishlist: wishlistReducer,
  filters: filtersReducer,
  wishlistStore: wishlistStoreReducer,
});

export default rootReducer;
