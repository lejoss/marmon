import * as types from "../constants/ActionTypes";

const initialState = {
  buttons: [],
  error: null,
  integrations: [],
  isFetching: false,
  currentButton: null,
  status: null,
  provisioning: null
};

export default function button(state = initialState, action) {
  switch (action.type) {
    case types.SET_CURRENT_BUTTON_SUCCESS:
      return { ...state, currentButton: action.payload };
    case types.GET_BUTTON_LIST:
      return { ...state, isFetching: true };
    case types.GET_BUTTON_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        buttons: action.payload
      };

    case types.GET_BUTTON_LIST_FAILURE:
      return { ...state, error: action.payload, isFetching: false };

    case types.REQUEST_INTEGRATIONS:
      return { ...state, isFetching: true };

    case types.REQUEST_INTEGRATIONS_SUCCESS:
      return { ...state, integrations: action.payload, isFetching: false };

    case types.REQUEST_INTEGRATIONS_FAILURE:
      return { ...state, error: action.payload, isFetching: false };

    case types.REQUEST_PROVISIONING:
      return { ...state, isFetching: true };
    
    case types.REQUEST_PROVISIONING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        provisioning: action.payload 
      };
      
    case types.REQUEST_PROVISIONING_FAILURE:
      return {
        ...state,
        isFetching: false,
        provisioning: action.payload 
      };

    case types.REQUEST_CONFIGURE_BUTTON:
      return { ...state, isFetching: true };

    case types.REQUEST_CONFIGURE_BUTTON_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: action.payload 
      };

    case types.REQUEST_CONFIGURE_BUTTON_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: action.payload 
      };

    default:
      return state;
  }
}
