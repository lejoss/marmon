
export const selectRegion = state => state.button.integrations[0].region;
export const selectSubdomain = state => state.button.integrations[0].device_gateway_url.split("ssl://")[1].split("\.")[0];
export const selectCertificate = (state, dsn) => state.button.integrations[0].keys_and_certificate[`${dsn}_cert`].certificate_pem;
export const selectPrivateKey = (state, dsn) => state.button.integrations[0].keys_and_certificate[`${dsn}_cert`].key_pair.private_key;
export const selectSsid = state => state.setup.networkCredentials.network;
export const selectPassword = state => state.setup.networkCredentials.password; 