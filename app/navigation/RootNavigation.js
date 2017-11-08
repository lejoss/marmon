import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import ButtonListScreen from '../screens/ButtonListScreen';
import SelectedButtonScreen from '../screens/SelectedButtonScreen';
import ButtonSetupInformation from '../screens/ButtonSetupInformation';
import SaveCredentials from '../screens/SaveCredentials';
import ConnectToButtonAPScreen from '../screens/ConnectToButtonAPScreen';
import IOSConnectButtonSteps from '../screens/IOSConnectButtonSteps';
import ConnectingButtonScreen from '../screens/ConnectingButtonScreen';
// import ThankYouScreen from '../screens/ThankYouScreen';
// import ConfigureButtonScreen from '../screens/ConfigureButtonScreen';
// import IOSConnectButtonSteps from '../screens/IOSConnectButtonSteps';
// import ConnectionFailureScreen from '../screens/ConnectionFailureScreen';

const RootStackNavigator = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    list: {
      screen: ButtonListScreen,
    },
    selectedButton: {
      screen: SelectedButtonScreen,
    },
    setup: {
      screen: ButtonSetupInformation,
    },
    saveCredentials: {
      screen: SaveCredentials,
    },
    buttonMode: {
      screen: ConnectToButtonAPScreen,
    },
    iosSteps: {
      screen: IOSConnectButtonSteps,
    },
    connectingButton: {
      screen: ConnectingButtonScreen,
    },
    // thankyou: {
    //   screen: ThankYouScreen,
    // },
    // ConnectionFailure: {
    //   screen: ConnectionFailureScreen,
    },
  {
    navigationOptions: () => ({
      headerMode: 'none',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
}
