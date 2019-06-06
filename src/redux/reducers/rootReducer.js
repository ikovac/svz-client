import { combineReducers } from "redux";
import wishlistReducer from "./wishlistReducer";
import filtersReducer from "./filtersReducer";

const rootReducer = combineReducers({
  wishlist: wishlistReducer,
  filters: filtersReducer,
});

export default rootReducer;
