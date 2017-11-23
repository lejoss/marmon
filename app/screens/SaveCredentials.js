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
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NetworkInfo } from "react-native-network-info";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import Layout from "../constants/Layout";

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
      isDisabled: false,
      error: "",
    };
  }

  componentDidMount() {
    const { wifiCredentials } = this.props;
    if (wifiCredentials) {
      this.setState({
        network: wifiCredentials.network,
        password: wifiCredentials.password,
        buttonSSID: wifiCredentials.buttonSSID
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      network: "",
      password: "",      
      isDisabled: false,
      error: ""
    });
  }

  _connectToButtonAP = () => {
    const { network, password } = this.state;
    if (network === "" || password === "") {
      this.setState({ error: "Please complete the form" });
      return;
    }

    NetworkInfo.getSSID(ssid => {
      if (ssid) {
        if (ssid.startsWith('Button ConfigureMe')) {
          this.setState({ isDisabled: true, error: "" });
          this.props.saveNetworkCredentials({
            network,
            password
          });
          this.props.navigation.navigate("connectingButton");
        } else {
          this.setState({ isDisabled: false });
          Alert.alert(
            "Please connect to ButtonConfigure me."
          );
          return;
        }
      } 
    });
  };

  render() {
    const { network, password, isDisabled } = this.state;
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View
            style={{
              flex: 2
            }}
          >
            <Text
              style={{
                color: "#868686",
                fontSize: 18,
                textAlign: "center",
                paddingVertical: 20,
                fontWeight: "bold"
              }}
            >
              Connect your Button to your Wi-Fi Network.
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
              returnKeyType="go"
              autoCorrect={false}
              inputStyle={{ paddingLeft: 5 }}
              ref={input => (this.passwordInput = input)}
            />
            <Text style={styles.error}>
              {this.state.error}
            </Text>
          </View>
          <View
            style={{
              flex: 1
            }}
          >
            <Button
              buttonStyle={{
                backgroundColor: "#0C6A9B"
              }}
              raised
              title="NEXT"
              disabled={isDisabled}
              onPress={this._connectToButtonAP}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    wifiCredentials: state.setup.networkCredentials,
    currentButton: state.button.currentButton
  };
};

export default connect(mapStateToProps, actions)(SaveCredentials);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Layout.window.height,
    backgroundColor: "#fff",
    paddingHorizontal: 8
  },
  error: {
    fontSize: 12,
    paddingLeft: 20,
    color: "red",
    backgroundColor: "transparent",
    paddingTop: 20
  },
});
