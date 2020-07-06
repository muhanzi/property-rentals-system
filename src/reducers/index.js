import { combineReducers } from "redux";
import userSigningReducer from "./userSigning";

// root reducer // it combines all reducers into one
const allReducers = combineReducers({ userSigning: userSigningReducer });

export default allReducers;
