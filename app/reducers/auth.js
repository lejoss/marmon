import * as types from "../constants/ActionTypes";

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  error: null,
  login: null,
  token: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return { ...state, isFetching: true };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
        error: null,
        login: action.payload.loginCredentials,
        token: action.payload.token
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
        error: null,
        login: null,
        token: null
      };
    case "LOGOUT_FAILURE":
      return { ...state, isFetching: false, error: null };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
        error: "Invalid username / password or connection lost"
      };
    default:
      return state;
  }
}
