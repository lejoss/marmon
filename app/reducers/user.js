import * as types from "../constants/ActionTypes";

const initialState = {
	login: null,
	wifi: null
};

export default function user(state = initialState, action) {
	switch (action.type) {    
	case types.SAVE_LOGIN_CREDENTIALS_SUCCESS:
		return { ...state, login: action.payload };
	default:
		return state;
	}
}
