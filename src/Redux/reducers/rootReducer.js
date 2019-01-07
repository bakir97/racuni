import { combineReducers } from "redux";
import allReducer from "./allReducer";
export default combineReducers({
  all: allReducer
});
