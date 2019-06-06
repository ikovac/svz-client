import { UPDATE_FILTERS } from "../actions/actionTypes";

const initialState = {
  datum: null,
  lokacija: null,
  kapacitet: "",
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTERS:
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
}
