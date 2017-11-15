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
import axios from 'axios';

var wifi = require("react-native-android-wifi");

import * as actions from '../actions'
import { createFormRequest } from '../services/utils'

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
    try {
      await this.props.requestConfigureButton();
      wifi.findAndConnect(this.props.networkCredentials.network, this.props.networkCredentials.password, found => {
        if (found) {                    
          setTimeout(() => {
            this.props.requestProvisioning(this.props.button.currentButton._id);
            this.props.navigation.navigate('thankyou');
          }, 9000);
        } else {
          console.log('connecting back error?')
        }
      })
    } catch (err) {
      console.log(err);
      Alert.alert(`ERROR configuring the button`, JSON.stringify(err, null, 2));
      this.props.navigation.navigate('ConnectionFailure');
    }
  }
  
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
    networkCredentials: state.setup.networkCredentials,
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
