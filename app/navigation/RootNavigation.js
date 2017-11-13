import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import ButtonListScreen from '../screens/ButtonListScreen';
import SaveCredentials from '../screens/SaveCredentials';
import ConnectToButtonAPScreen from '../screens/ConnectToButtonAPScreen';
import IOSConnectButtonSteps from '../screens/IOSConnectButtonSteps';
import ConnectingButtonScreen from '../screens/ConnectingButtonScreen';
import ThankYouScreen from '../screens/ThankYouScreen';
import ConnectionFailureScreen from '../screens/ConnectionFailureScreen';

const RootStackNavigator = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    list: {
      screen: ButtonListScreen,
    },
    buttonMode: {
      screen: ConnectToButtonAPScreen,
    },
    saveCredentials: {
      screen: SaveCredentials,
    },
    iosSteps: {
      screen: IOSConnectButtonSteps,
    },
    connectingButton: {
      screen: ConnectingButtonScreen,
    },
    thankyou: {
      screen: ThankYouScreen,
    },
    ConnectionFailure: {
      screen: ConnectionFailureScreen,
    },
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
