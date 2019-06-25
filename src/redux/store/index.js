import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";

import rootReducer from "../reducers/rootReducer";

// const middleware = [thunk, logger];
const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
