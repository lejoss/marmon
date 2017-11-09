import * as types from '../constants/ActionTypes';
import axios from 'axios';
import Base64 from './base64';

// action creators

const loginSuccess = token => ({ type: types.LOGIN_SUCCESS, payload: token });
const loginFailure = err => ({ type: types.LOGIN_FAILURE, payload: err });

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
    const url = 'http://stage.services.machineshop.io/api/v1/user_session/user/authenticate';    
    const { data: { authentication_token } } = await axios.post(url, JSON.stringify(user));
    const toBase64 = Base64.encode(authentication_token + ':X');
    axios.defaults.headers.common['Authorization'] = `Basic ${toBase64}`;
    dispatch(loginSuccess(`Basic ${toBase64}`));
  } catch (err) {
    dispatch(loginFailure(err));
  }
};

export const saveNetworkCredentials = credentials => async (dispatch) => {
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

export const requestConfigureButton = () => (dispatch, getState) => {
	try {
		dispatch({ type: types.REQUEST_CONFIGURE_BUTTON });
		const { button, setup } = getState();			
		const url = 'http://192.168.0.1/configure';
		const dsn = button.currentButton.unique_id;
		const body = createFormRequest({ button, setup }, dsn);

		//const { data } = await axios.post(url, body);		
		//dispatch(requestConfigureButtonSuccess(data));
	} catch (err) {
		dispatch(requestConfigureButtonFailure(err));
	}
}

export const requestProvisioning = () => (dispatch, getState) => {
	try {
		dispatch({ type: types.REQUEST_PROVISIONING });
		const url = 'http://stage.services.machineshop.io/api/v1/platform/gateway_data_sources';
		// const body = {
		// 	"data_source_type_id": " 59e12d5ff1f1790f271ef222 ",
		// 	"name": "Warehouse Bench - 532",
		// 	"unique_id": "3r545",
		// 	"marmon_button": true
		// };
		// const { data } = await axios.post(url, body);

		// dispatch(requestConfigureButtonSuccess(data));

	} catch (error) {
		dispatch(requestProvisioningFailure(data));
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

// selectors
const selectRegion = state => state.button.integrations[0].region;
const selectSubdomain = state => state.button.integrations[0].device_gateway_url.split("ssl://")[1].split("\.")[0];
const selectCertificate = (state, dsn) => state.button.integrations[0].keys_and_certificate[`${dsn}_cert`].certificate_pem;
const selectPrivateKey = (state, dsn) => state.button.integrations[0].keys_and_certificate[`${dsn}_cert`].key_pair.private_key;
const selectSsid = state => state.setup.networkCredentials.buttonSSID;
const selectPassword = state => state.setup.networkCredentials.password;

// utils

const createFormRequest = (state, dsn) => {
	let formData = new FormData();
	formData.append("wifi_ssid", selectSsid(state));
	formData.append("wifi_password", selectPassword(state));
	formData.append("aws_iot_certificate", selectCertificate(state, dsn));
	formData.append("aws_iot_private_key", selectPrivateKey(state, dsn));
	formData.append("endpoint_region", selectRegion(state));
	formData.append("endpoint_subdomain", selectSubdomain(state));
	
	return formData
}