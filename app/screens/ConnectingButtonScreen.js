import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  NetInfo,
  Alert,
  Platform,
  ActivityIndicator
} from "react-native";
import { NetworkInfo } from "react-native-network-info";
import { NavigationActions } from 'react-navigation';
import { connect } from "react-redux";

import * as actions from "../actions";

class ConnectingButtonScreen extends React.Component {
  static navigationOptions = {    
    headerTitle: 'Setup Button',
    headerTintColor: 'white',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C6A9B',
      height: Platform.OS === 'ios' ? 60 : 80,
      paddingTop: 20,
    },
  };

  state = {
    loading: true ,
    configSuccess: false   
  };

  componentWillMount() {
    if (Platform.OS === 'android') {
      this.props.requestConfigureButton();

      NetInfo.addEventListener(
        "connectionChange",
        this._requestProvisioning.bind(this)
      );
    }
  }

  async componentDidMount() {
    try {
      if (Platform.OS === "ios") {
        await this.props.requestConfigureButton();
        await setTimeout(() => {
          this.props.requestProvisioning(
            this.props.button.currentButton._id
          );
        }, 9000);
      } else { return null }
    } catch (error) {
        Alert.alert('Error: Failed Configuring Button (ERR_02)')
        this._goToFailureScreen()
    }    
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)    
    const { buttonConfigStatus, buttonProvisioningStatus } = nextProps;

    if (buttonConfigStatus) {
      if (buttonConfigStatus !== 200) {
        this._goToFailureScreen()
      }
    }

    if (buttonConfigStatus && buttonProvisioningStatus) {
      if (buttonConfigStatus === 200 && buttonProvisioningStatus === 200 && this.state.configSuccess === false) {
        this.setState({ configSuccess: true })
        this._goToThankYouPage()
      } else if ( (buttonConfigStatus === 200) && (buttonProvisioningStatus !== 200) ) {
        this._goToFailureScreen()
      }
    }
  }

  componentWillUnmount() {
    this.setState({ loading: false })
    if (Platform.OS === 'android') {
      NetInfo.removeEventListener(
        'connectionChange',
        this._requestProvisioning.bind(this)
      );
    } 
  }

  _goToThankYouPage() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "thankyou" })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  _goToFailureScreen() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "ConnectionFailure" })]
    });
    this.props.navigation.dispatch(resetAction);
  }
  
  async _requestProvisioning() {
    try {
      const { button: { currentButton }, networkCredentials, buttonConfigStatus } = this.props;
      const { type } = await NetInfo.getConnectionInfo();

      if ((type === 'wifi') && (buttonConfigStatus === 200)) {
        setTimeout(() => {
          this.props.requestProvisioning(currentButton._id);
        }, 1000)
      }
    } catch (err) {}
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
          {this.state.loading && (
            <ActivityIndicator size="large" color="#0C6A9B" />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    networkCredentials: state.setup.networkCredentials,
    button: state.button,
    buttonConfigStatus: state.button.status,
    buttonProvisioningStatus: state.button.provisioning
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
  }
});
