import React from "react";
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
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { NetworkInfo } from "react-native-network-info";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import axios from "axios";

var wifi = require("react-native-android-wifi");

import * as actions from "../actions";
import { createFormRequest } from "../services/utils";

// tabBarLabel: "Setup",
// headerLeft: null,
// headerTitle: "Button Setup",
// headerTintColor: "white",
// headerStyle: {
//   backgroundColor: "#0C6A9B",
//   height: Platform.OS === "ios" ? 60 : 80,
//   paddingTop: 20
// }

class ConnectingButtonScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    try {
      if (Platform.OS === "android") {
        await this.props.requestConfigureButton();        
        wifi.findAndConnect(
          this.props.networkCredentials.network,
          this.props.networkCredentials.password,
          found => {
            if (found) {
              setTimeout(() => {                
                this.props.requestProvisioning(
                  this.props.button.currentButton._id
                );
              }, 9000);
            } else {
              console.log("connecting back error?");
            }
          }
        );
      }

      if (Platform.OS === "ios") {
        await this.props.requestConfigureButton();
        setTimeout(() => {
          this.props.requestProvisioning(
            this.props.button.currentButton._id
          );
        }, 9000);
      }
    } catch (err) {
      //Alert.alert(`ERROR configuring the button`, JSON.stringify(err, null, 2));
      this.props.navigation.navigate("ConnectionFailure");
    }
  }

  componentWillReceiveProps(nextProps) {
    const { buttonConfig, buttonProvisioning } = nextProps;
    if (nextProps && buttonConfig && buttonProvisioning) {
      if (buttonConfig.status === 200 && buttonProvisioning.status === 200) {
        this.props.navigation.navigate("thankyou");
      } else {
        this.props.navigation.navigate("ConnectionFailure");
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="#0D4969" />
        <Text style={{ textAlign: "center" }}>
          <Text style={styles.bold}>Connecting to{"\n"} </Text>
          <Text style={styles.bold}>your Button...{"\n"} </Text>
          <Text style={styles.bold}>Do not close the app{"\n"} </Text>
          <Text style={styles.loading}>...</Text>
        </Text>        
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    networkCredentials: state.setup.networkCredentials,
    button: state.button,    
    buttonConfig: state.button.status,
    buttonProvisioning: state.button.provisioning,
    setup: state.setup
  };
};

export default connect(mapStateToProps, actions)(ConnectingButtonScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16
  },
  bold: {
    color: "#868686",
    fontSize: 18,
    fontWeight: "bold"
  },
  loading: {
    color: "#868686",
    fontSize: 50,
    textAlign: "center",
    paddingBottom: 20
  }
});
