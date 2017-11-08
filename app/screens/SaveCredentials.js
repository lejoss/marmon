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
import { NetworkInfo } from "react-native-network-info";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";

class SaveCredentials extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Setup",
    headerTitle: `Button Setup`,
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#0C6A9B",
      height: Platform.OS === "ios" ? 60 : 56,
      paddingTop: Platform.OS === "ios" ? 20 : StatusBar.statusBarHeight
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
    const getSSID = NetworkInfo.getSSID(network => this.setState({ network }));
    const buttonSSID = await AsyncStorage.getItem("buttonSSID");
    const password = await AsyncStorage.getItem("password");

    if (password && buttonSSID) {
      this.setState({
        password,
        buttonSSID
      });
    }
  }

  _onSubmit = async event => {
    event.preventDefault();
    const { network, password, buttonSSID } = this.state;
    await AsyncStorage.setItem("password", password);
    await AsyncStorage.setItem("buttonSSID", buttonSSID);
    await this.props.saveNetworkCredentials({ network, password, buttonSSID });
    this.props.navigation.navigate("connectingButton");
  };

  _refreshSSID = () => {
    const { network, password, buttonSSID } = this.state;
    if (network === "" || password === "" || buttonSSID === "") {
      this.setState({ error: "Please complete the form" });
    } else {
      NetworkInfo.getSSID(ssid => {
        if (ssid === `Button ConfigureMe - ${buttonSSID}`) {
          Alert.alert("Connected to:", ssid);
          this.setState({ isDisabled: false, error: "" });
        } else {
          Alert.alert(
            "Please connect to Button ConfigureMe Network, You are currently connected to: ",
            ssid
          );
          this.setState({ isDisabled: false, error: "" });
        }
      });
    }
  };

  render() {
    const { network, password, buttonSSID, isDisabled } = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding"  style={{ flex: 1 }}>
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
            flex: 1,
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Button
            buttonStyle={{ backgroundColor: "#0C6A9B" }}
            raised
            title="REFRESH"
            onPress={this._refreshSSID}
          />

          <Button
            buttonStyle={{ backgroundColor: "#0C6A9B" }}
            raised
            title="CONNECT"
            disabled={isDisabled}
            onPress={this._onSubmit}
          />
        </View>
        </KeyboardAvoidingView>       
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    creds: state.setup.networkCredentials
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
