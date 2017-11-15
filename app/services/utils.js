import { NavigationActions } from 'react-navigation';
import { 
	selectSsid, 
	selectPassword, 
	selectCertificate, 
	selectPrivateKey, 
	selectRegion, 
	selectSubdomain 
} from '../selectors'

export const createFormRequest = (state, dsn) => {
	let formData = new FormData();
	formData.append("wifi_ssid", selectSsid(state));
	formData.append("wifi_password", selectPassword(state));
	formData.append("aws_iot_certificate", unescape(selectCertificate(state, dsn)));
	formData.append("aws_iot_private_key", unescape(selectPrivateKey(state, dsn)));
	formData.append("endpoint_region", selectRegion(state));
	formData.append("endpoint_subdomain", selectSubdomain(state));

	return formData
}
