import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator
} from "react-native";

import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import RootNavigation from "./navigation/RootNavigation";

const { persistor, store } = configureStore();

const onBeforeLift = () => {
  // take some action before the gate lifts
};

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="#0C6A9B" />
            </View>
          }
          persistor={persistor}
        >
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
            {Platform.OS === "android" && (
              <StatusBar translucent backgroundColor="#0D4969" />
            )}
            <RootNavigation />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
