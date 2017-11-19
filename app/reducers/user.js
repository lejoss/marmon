import * as types from "../constants/ActionTypes";

const initialState = {
	login: null,
	wifi: null
};

export default function user(state = initialState, action) {
	switch (action.type) {    
	case types.LOGIN_SUCCESS:
		return { ...state, login: action.payload.login };

	case types.SAVE_CREDENTIALS:
		return { ...state, wifi: action.payload };
	default:
		return state;
	}
}
