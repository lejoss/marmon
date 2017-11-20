import React from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, Image, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from "react-navigation";
import Layout from '../constants/Layout';

export default class ConnectionFailureScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Setup Failed',
    headerTintColor: 'white',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C6A9B',
      height: Platform.OS === 'ios' ? 60: 80,
      paddingTop: 20
    },
  };

  _resetNavigation() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "list" })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="#0D4969" />
        <Text style={{ textAlign: 'center' }}>
          <Text style={styles.bold}>Connection Failed{"\n"} </Text>
          <Text style={styles.content}>Please check your internet connection{"\n"}</Text>
        </Text>        

        <View style={{ width: Layout.window.width, paddingHorizontal: 16 }}>
          <Button
						onPress={() => this._resetNavigation()}
            title="RETRY"
            buttonStyle={{ backgroundColor: "#0C6A9B" }}
            raised
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16    
  },
  bold: {
    color: '#868686',
    fontSize: 18,
    fontWeight: 'bold'
  },
  content: {
    color: '#868686',
    fontSize: 14,
    fontWeight: 'bold'
  }
});
