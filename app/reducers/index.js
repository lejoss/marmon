import { combineReducers } from "redux";
import auth from "./auth";
import button from "./button";
import setup from "./setup";

const rootReducer = combineReducers({
	auth,
	button,
	setup
});

export default rootReducer;
