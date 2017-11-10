import React from "react";
import {
  FormValidationMessage,
  FormLabel,
  FormInput,
  Button
} from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Linking,
  StatusBar,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NetworkInfo } from "react-native-network-info";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import Layout from '../constants/Layout'

var wifi = require('react-native-android-wifi');

class SaveCredentials extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Setup",
    headerTitle: `Button Setup`,
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#0C6A9B",
      height: Platform.OS === "ios" ? 60 : 80,
      paddingTop: 20
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      network: "",
      password: "",
      buttonSSID: "",
      isDisabled: true,
      error: ""
    };
  }

  async componentDidMount() {     
    try {
      NetworkInfo.getSSID(network => {
        this.setState({ network })
      });

      const buttonSSID = await AsyncStorage.getItem("buttonSSID");
      const password = await AsyncStorage.getItem("password");

      if (password && buttonSSID) {
        this.setState({
          password,
          buttonSSID
        });
      }
    } catch (err) {

    } 
  }

  _connectToButtonAP = () => {
    const { network, password, buttonSSID } = this.state; 

    if (network === "" || password === "" || buttonSSID === "") {
      this.setState({ error: "Please complete the form" });
    } else if (Platform.OS == 'android') {           
      // is wifi enabled?
      wifi.isEnabled((isEnabled)=> {
        if (isEnabled) {
          const { unique_id  } = this.props.currentButton;
          //const { creds: { buttonSSID } } = this.props;
          const ssid = `Button ConfigureMe - ${buttonSSID}`;
          const password = unique_id.toUpperCase().slice(8, 16);

          wifi.findAndConnect(ssid, password, (found) => {
            if (found) {
              this.setState({ isDisabled: false, error: "" });
              Alert.alert('Connected to: ', ssid)
            } else {
              this.setState({ isDisabled: false, error: "" });
              Alert.alert('Could not connect to: ', ssid)
            }
          })
        } else{
          Alert.alert("wifi service is disabled");
        }
      })
    } else if (Platform.OS == 'ios') {      
      // am i connected to nutton configure me?
      NetworkInfo.getSSID(ssid => {
        if (ssid) {
          if (ssid === `Button ConfigureMe - ${buttonSSID}`) {
            Alert.alert(`Great! Connected to ${ssid}`)
            this.setState({ isDisabled: false });
          } else {
            Alert.alert('Please connect to ButtonConfigure me before continue.')
          }
        }
      });
    }                  
  }

  _onSubmit = async event => {
    event.preventDefault();
    try {      
      const { network, password, buttonSSID } = this.state;
      await AsyncStorage.setItem("password", password);
      await AsyncStorage.setItem("buttonSSID", buttonSSID);
      await this.props.saveNetworkCredentials({ network, password, buttonSSID });

      this.props.navigation.navigate("connectingButton");
    } catch (error) {      
    }    
  };

  render() {
    const { network, password, buttonSSID, isDisabled } = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={{ flex: 2, justifyContent: "center", paddingTop: 20 }}>
            <Text 
              style={{
                paddingHorizontal: 8,
                color: "#868686",
                fontSize: 14,
                textAlign: "center",
                paddingBottom: 20,
                fontWeight: "bold"
              }}
            >
              Connect your Dash Button to your Wi-Fi network.
            </Text>
            <FormLabel inputStyle={{ backgroundColor: "transparent" }}>
              Name of your Wifi Network
            </FormLabel>
            <FormInput
              underlineColorAndroid="#0C6A9B"
              value={network}
              onChangeText={network => this.setState({ network })}
              autoCapitalize="none"
              returnKeyType="next"
              autoCorrect={false}
              inputStyle={{ paddingLeft: 5 }}
              onSubmitEditing={() => this.passwordInput.focus()}
            />
            <FormLabel inputStyle={{ backgroundColor: "transparent" }}>
              Password
            </FormLabel>
            <FormInput
              underlineColorAndroid="#0C6A9B"
              value={password}
              onChangeText={password => this.setState({ password })}
              autoCapitalize="none"
              returnKeyType="next"
              autoCorrect={false}
              inputStyle={{ paddingLeft: 5 }}
              secureTextEntry
              onSubmitEditing={() => this.buttonSSID.focus()}
              ref={input => (this.passwordInput = input)}
            />
            <FormLabel inputStyle={{ backgroundColor: "transparent" }}>
              Button Network SSID
            </FormLabel>
            <FormInput
              underlineColorAndroid="#0C6A9B"
              value={buttonSSID}
              onChangeText={buttonSSID => this.setState({ buttonSSID })}
              autoCapitalize="none"
              returnKeyType="go"
              maxLength={3}
              autoCorrect={false}
              inputStyle={{ paddingLeft: 5 }}
              ref={input => (this.buttonSSID = input)}
            />
            <Text
              style={{
                paddingLeft: 20,
                paddingTop: 20,
                color: "tomato",
                fontWeight: "bold",
                fontSize: 14
              }}
            >
              {this.state.error && this.state.error}
            </Text>
          </View>
          <View
            style={{
              paddingTop: 60,
              flex: 1,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Button
                buttonStyle={{ backgroundColor: "#0C6A9B", alignSelf: 'stretch' }}
                raised
                title="CONNECT"
                onPress={this._connectToButtonAP}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                buttonStyle={{ backgroundColor: "#0C6A9B",  alignSelf: 'stretch' }}
                raised
                title="NEXT"
                disabled={isDisabled}
                onPress={this._onSubmit}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    creds: state.setup.networkCredentials,
    currentButton: state.button.currentButton
  };
};

export default connect(mapStateToProps, actions)(SaveCredentials);

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: "#fff",
    paddingHorizontal: 16
  }
});
