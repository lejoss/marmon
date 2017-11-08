import * as types from "../constants/ActionTypes";

const initialState = {
	isFetching: false,
	isAuthenticated: false,
	error: null,
};

export default function auth(state = initialState, action) {
	switch (action.type) {
	// case types.LOGIN_REQUEST:
	//   return { ...state, isFetching: action.payload };
	case types.LOGIN_SUCCESS:
		return { ...state, isAuthenticated: true };
	case types.LOGIN_FAILURE:
		return {
			...state,
			isAuthenticated: false,
			error: 'Invalid Username or Password'
		};
	default:
		return state;
	}
}
