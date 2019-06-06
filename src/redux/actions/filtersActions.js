import { UPDATE_FILTERS } from "./actionTypes";

export function updateFilters(name, value) {
  return dispatch => {
    dispatch({ type: UPDATE_FILTERS, name, value });
  };
}
