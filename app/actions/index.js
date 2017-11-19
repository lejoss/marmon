import * as types from '../constants/ActionTypes';
import axios from 'axios';
import Base64 from './base64';
import { createFormRequest } from '../services/utils'

// action creators


const loginSuccess = (token, login) => ({ type: types.LOGIN_SUCCESS, payload: { token, login } });
const loginFailure = err => ({ type: types.LOGIN_FAILURE, payload: err });

const logoutSuccess = () => ({ type: types.LOGOUT_SUCCESS, payload: { isAutenticated: false } });
const logoutFailure = err => ({ type: types.LOGOUT_FAILURE, payload: err });

const getButtonListFailure = err => ({ type: types.GET_BUTTON_LIST_FAILURE, payload: err });
const getButtonListSuccess = payload => ({ type: types.GET_BUTTON_LIST_SUCCESS, payload });

const requestIntegrationsFailure = err => ({ type: types.REQUEST_INTEGRATIONS_FAILURE, payload: err });
const requestIntegrationsSuccess = payload => ({ type: types.REQUEST_INTEGRATIONS_SUCCESS, payload });

const requestConfigureButtonFailure = err => ({ type: types.REQUEST_CONFIGURE_BUTTON_FAILURE, payload: err });
const requestConfigureButtonSuccess = payload => ({ type: types.REQUEST_CONFIGURE_BUTTON_SUCCESS, payload });

const requestProvisioningFailure = err => ({ type: types.REQUEST_PROVISIONING_FAILURE, payload: err });
const requestProvisioningSuccess = payload => ({ type: types.REQUEST_PROVISIONING_SUCCESS, payload });

const saveCredentials = credentials => ({ type: types.SAVE_CREDENTIALS, payload: credentials });

export const login = user => async dispatch => {
  try {
    dispatch({ type: "REQUEST_LOGIN" })
    const url = 'http://stage.services.machineshop.io/api/v1/user_session/user/authenticate';    
    const { data: { authentication_token } } = await axios.post(url, JSON.stringify(user));
    const toBase64 = Base64.encode(authentication_token + ':X');
    axios.defaults.headers.common['Authorization'] = `Basic ${toBase64}`;
    await dispatch(loginSuccess(`Basic ${toBase64}`, user));
  } catch (err) {
    dispatch(loginFailure(err));
  }
};

export const destroySession = () => dispatch => {
  try {
    dispatch(logoutSuccess())
  } catch (err) {
    dispatch(logoutFailure(err))
  }
}

export const saveNetworkCredentials = credentials => (dispatch) => {
  dispatch(saveCredentials(credentials));
}

export const requestGatewayDataSources = user => async (dispatch, getState) => {
  try {
    dispatch({ type: types.GET_BUTTON_LIST })
    const url = 'http://stage.services.machineshop.io/api/v1/platform/gateway_data_sources';
    const { auth: { authToken } } = getState();
    const { data } = await axios.get(url);
    dispatch(getButtonListSuccess(data));
  } catch (err) {
    dispatch(getButtonListFailure(err));
  }
};

export const requestIntegrations = user => async dispatch => {
  try {
    dispatch({ type: types.REQUEST_INTEGRATIONS })
    const url = 'http://stage.services.machineshop.io/api/v1/platform/integrations';
    const { data } = await axios.get(url);
    dispatch(requestIntegrationsSuccess(data));
  } catch (err) {
    dispatch(requestIntegrationsFailure(err));
  }
};

export const requestConfigureButton = () => async (dispatch, getState) => {
	try {
		dispatch({ type: types.REQUEST_CONFIGURE_BUTTON });
		const { button, setup } = getState();			
    const url = 'http://192.168.0.1/configure';
    const config = {
      'Content-Type': 'multipart/form-data; charset=utf-8'
    }
		const dsn = button.currentButton.unique_id;
		const body = createFormRequest({ button, setup }, dsn);

		const response = await axios.post(url, body, config);		
    console.log('data', JSON.stringify(response, null, 2))
    dispatch(requestConfigureButtonSuccess(response));
	} catch (err) {
		dispatch(requestConfigureButtonFailure(err));
	}
}

export const requestProvisioning = (buttonId) => async (dispatch, getState) => {
	try {
		dispatch({ type: types.REQUEST_PROVISIONING });
		const url = `http://stage.services.machineshop.io/api/v1/platform/gateway_data_sources/${buttonId}/provision_marmon_button`;
		const response = await axios.put(url, {});
		dispatch(requestProvisioningSuccess(response));
	} catch (err) {
		dispatch(requestProvisioningFailure(err));
	}
}

export const setCurrentButton = button => dispatch => {
	try {		
		dispatch({ type: types.SET_CURRENT_BUTTON });
		dispatch({ type: types.SET_CURRENT_BUTTON_SUCCESS, payload: button });
	} catch (err) {
		dispatch({ type: types.SET_CURRENT_BUTTON_FAILURE, payload: err });
	}
}
