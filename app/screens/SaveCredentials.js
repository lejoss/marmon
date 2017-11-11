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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NetworkInfo } from "react-native-network-info";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import Layout from "../constants/Layout";

var wifi = require("react-native-android-wifi");

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
      NetworkInfo.getSSID(network => this.setState({ network }));
      //const network = await AsyncStorage.getItem("network");
      const buttonSSID = await AsyncStorage.getItem("buttonSSID");
      const password = await AsyncStorage.getItem("password");
      if (password && buttonSSID) {
        this.setState({
          password,
          buttonSSID
        });
      }
    } catch (err) {}
  }

  _connectToButtonAP = async () => {
    try {
      const { network, password, buttonSSID } = this.state;

      // VALIDATE FORM
      if (network === "" || password === "" || buttonSSID === "") {
        this.setState({ error: "Please complete the form" });
        return;
      }

      await AsyncStorage.setItem("network", password);
      await AsyncStorage.setItem("password", password);
      await AsyncStorage.setItem("buttonSSID", buttonSSID);

      this.props.saveNetworkCredentials({
        network,
        password,
        buttonSSID
      });
      
      if (Platform.OS == "android") {
        this.setState({ error: "" });             
        wifi.isEnabled(isEnabled => {
          if (isEnabled) {            
            const buttonAPNetwork = `Button ConfigureMe - ${buttonSSID}`;
            const password = this.props.currentButton.unique_id.toUpperCase().slice(8, 16);                    
            if (network === buttonAPNetwork) {              
              this.props.navigation.navigate("connectingButton");
            } else {              
              wifi.disconnect();              
              wifi.findAndConnect(buttonAPNetwork, password, found => {
                if (found) {
                  this.props.navigation.navigate("connectingButton");
                } else {                                    
                  Alert.alert("Could not connect to: ", buttonAPNetwork);
                  return;
                }
              });
            }
          } else {
            Alert.alert(
              "wifi service is disabled, connect to wifi and try again"
            );
          }
        });
      } else if (Platform.OS === "ios") {
        this.setState({ error: "" });        
        NetworkInfo.getSSID(ssid => {
          if (ssid) {
            if (ssid === `Button ConfigureMe - ${buttonSSID}`) {
              this.props.navigation.navigate("connectingButton");              
            } else {
              Alert.alert(
                "Please connect to ButtonConfigure me before continue."
              );
              return;
            }
          } else {
            Alert.alert(
              "wifi service is disabled, connect to wifi and try again"
            );
          }
        });
      }
    } catch (err) {}
  };

  render() {
    const { network, password, buttonSSID, isDisabled } = this.state;
    return (

        <KeyboardAwareScrollView style={styles.container}>
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
              Connect your Button to your Wi-Fi network.
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
          </View>
          <View style={{ flex: 1 }}>
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
            style={{ flex: 1, justifyContent: 'center', paddingTop: 40 }}
          >
            <Button
              buttonStyle={{ backgroundColor: "#0C6A9B" }}
              raised
              title="NEXT"              
              onPress={this._connectToButtonAP}
            />
          </View>
        </KeyboardAwareScrollView>

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
