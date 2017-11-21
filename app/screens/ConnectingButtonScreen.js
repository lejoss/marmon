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

  state = {
    loading: true
  }

  async componentWillMount() {
    try {
      await this.props.requestConfigureButton();
      NetInfo.addEventListener(
        'connectionChange',
        this._requestProvisioning.bind(this)
      );    
    } catch (error) {
    }
  }

  _requestProvisioning() {
    const { button: { currentButton }, networkCredentials } = this.props;
      NetworkInfo.getSSID(network => {
        if (currentButton && network) {
          if (network === networkCredentials.network) {
            this.props.requestProvisioning(currentButton._id);
          } else return;
        }
      })     
      NetInfo.removeEventListener(
        'connectionChange',
        this._requestProvisioning.bind(this)
      ); 
  }

  componentWillReceiveProps(nextProps) {
    const { buttonConfig, buttonProvisioning } = nextProps;
    if (nextProps && buttonConfig && buttonProvisioning) {
      if (buttonConfig.status === 200 && buttonProvisioning.status === 200) {
        this.setState({ loading: false })
        
        this.props.navigation.navigate("thankyou");
      } else if (buttonConfig.status !== 200 || buttonProvisioning.status !== 200) {
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
        </Text>      
        <View>
          {(this.props.button.isFetching || this.state.loading) && <ActivityIndicator size="large" color="#0C6A9B" />}  
        </View>  
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
