import React from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	ScrollView, 
	Platform, 
	Image, 
	WebView, 
	StatusBar,
	NetInfo,
  Alert,
  AsyncStorage
} from 'react-native';
import { NetworkInfo } from "react-native-network-info";
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

var wifi = require("react-native-android-wifi");

import * as actions from '../actions'
import { selectSsid, selectPassword, selectCertificate, selectPrivateKey, selectRegion, selectSubdomain } from '../selectors'

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

class ConnectingButtonScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Setup',
    headerTitle: 'Button Setup',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#0C6A9B',
      height: Platform.OS === 'ios' ? 60 : 80,
      paddingTop: 20
    },
	};
	
	async componentDidMount() {
    const buttonXXX = await AsyncStorage.getItem("buttonSSID");
    NetworkInfo.getSSID(network => {
      if (network) {        
        if (network === `Button ConfigureMe - ${buttonXXX}`) {
          //this.props.requestConfigureButton();
          //await this.props.requesProvisioning();

          const dsn = this.props.button.currentButton.unique_id;
          const body = createFormRequest({ button: this.props.button, setup: this.props.setup }, dsn);

          const request = new XMLHttpRequest();
          request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
              return;
            }

            if (request.status === 200) {              
              Alert.alert('success configuring the button', request.responseText);
            } else {
              Alert.alert(`ERROR configuring the button${request.status}`, JSON.stringify(body));
            }
          };
          
          request.open('POST', 'http://192.168.0.1/configure', true);
          request.send(JSON.stringify(body));

        }
      } else {
        Alert.alert('ERROR 2 configuring the button');
      }
    });
    // validate that is connected to button configure me or kick em to previous screen
    
    
	}

  // componentWillUpdate(nextProps) {
  //   if (nextProps.configureStatus) {
  //     Alert.alert(nextProps.configureStatus);
  //   }
  // }
  
  render() {
  
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          <Text style={styles.bold}>Connecting to{"\n"} </Text>
          <Text style={styles.bold}>your Button...{"\n"} </Text>
          <Text style={styles.bold}>Do not close the app{"\n"} </Text>
          <Text style={styles.loading}>....</Text>
        </Text>         
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //configureStatus: state.button.status,
    button: state.button,
    setup: state.setup
  }
}

export default connect(mapStateToProps, actions)(ConnectingButtonScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16
  },
  bold: {
    color: '#868686',
    fontSize: 18,
    fontWeight: 'bold'
  },
  loading:{
    position: 'relative',
    top: -20,
    color: '#868686',
    fontSize: 80,
    textAlign: 'center',
  }
});
