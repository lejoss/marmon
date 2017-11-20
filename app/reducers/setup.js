import * as types from "../constants/ActionTypes";

const initialState = {
	networkCredentials: null,
};

export default function setup(state = initialState, action) {
	switch (action.type) {    
		
	case types.SAVE_CREDENTIALS:
		return { ...state, networkCredentials:  action.payload };
	default:
		return state;
	}
}
