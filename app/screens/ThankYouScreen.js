import React from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, Image, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import Layout from '../constants/Layout';

export default class ThankYouScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Setup Completed',
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
      actions: [NavigationActions.navigate({ routeName: 'list' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="#0D4969" />
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 14, textAlign: 'center' }}>
            <Text style={styles.bold}>Your Dash Button{"\n"} </Text>
            <Text style={styles.bold}>has been succesfully connected.{"\n\n"} </Text>
            <Text style={styles.bold}>Thank You!</Text>
          </Text>
        </View>
        <View style={{ flex: 1, width: Layout.window.width, paddingHorizontal: 16, justifyContent: 'center'  }}>
          <Button
						onPress={() => this._resetNavigation()}
            title="BACK TO BUTTON LIST"
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
    fontSize: 20,
    fontWeight: 'bold'
  },
  loading:{
    color: '#868686',
    fontSize: 60,
  }
});
