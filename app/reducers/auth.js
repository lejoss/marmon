import * as types from "../constants/ActionTypes";

const initialState = {
	isFetching: false,
	isAuthenticated: false,
	error: null,
};

export default function auth(state = initialState, action) {
	switch (action.type) {
	case "REQUEST_LOGIN":
	  return { ...state, isFetching: true };
	case types.LOGIN_SUCCESS:
		return { ...state, isAuthenticated: true, isFetching: false };
	case "LOGOUT_SUCCESS":
		return { ...state, isAuthenticated: false, isFetching: false };
		case "LOGOUT_FAILURE":
		return { ...state, isFetching: false };	
	case types.LOGIN_FAILURE:
		return {
			...state,
			isAuthenticated: false,
			isFetching: false,
			error: 'Invalid Username or Password'
		};
	default:
		return state;
	}
}
