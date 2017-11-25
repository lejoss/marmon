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
import { NavigationActions } from 'react-navigation';
import _ from "lodash";
import * as actions from "../actions";
import Layout from "../constants/Layout";

class SaveCredentials extends React.Component {
  static navigationOptions = {
    headerTitle: `Button Setup`,
    headerBackTitle: null,
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#0C6A9B",
      height: Platform.OS === "ios" ? 60 : 80,
      paddingTop: 20
    }
  };

  constructor(props) {
    super(props);

    this.onPressDelayed = _.debounce(this._connectToButtonAP, 150);

    this.state = {
      network: "",
      password: "",
      buttonSSID: "",
      error: ""
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
      error: ""
    });
  }

  _goToSetupScreen() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "connectingButton" })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  _connectToButtonAP() {
    const { network, password } = this.state;
    if (network === "" || password === "") {
      this.setState({ error: "Please complete the form" });
      return;
    }
    this.setState({ error: "" });
    NetworkInfo.getSSID(ssid => {
      if (ssid) {
        if (ssid.startsWith("Button ConfigureMe")) {
          this.props.saveNetworkCredentials({ network, password });
          this._goToSetupScreen()
        } else {
          Alert.alert("Please connect to ButtonConfigure me.");
          return;
        }
      }
    });
  }

  render() {
    const { network, password } = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={{ height: Layout.window.height -  (Platform.OS === "ios" ? 80 : 100) }}>
          <View
            style={{
              flex: 3
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
              onSubmitEditing={this._connectToButtonAP.bind(this)}
            />
            <Text style={styles.error}>{this.state.error}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Button
              buttonStyle={{
                backgroundColor: "#0C6A9B"
              }}
              raised
              title="NEXT"
              onPress={this.onPressDelayed.bind(this)}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
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
    backgroundColor: "#fff",
    paddingHorizontal: 8
  },
  error: {
    fontSize: 12,
    paddingLeft: 20,
    color: "red",
    backgroundColor: "transparent",
    paddingTop: 20
  }
});
