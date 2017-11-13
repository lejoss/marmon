import React from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, Image, WebView } from 'react-native';
import { Button } from 'react-native-elements';
import Layout from '../constants/Layout';

export default class ThankYouScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Button Setup',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#0C6A9B',
      height: Platform.OS === 'ios' ?60 : 80,
      paddingTop: 20,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 14, textAlign: 'center' }}>
          <Text style={styles.bold}>Your Dash Button{"\n"} </Text>
          <Text style={styles.bold}>has been succesfully connected.{"\n\n"} </Text>
          <Text style={styles.bold}>Thank You!</Text>
        </Text> 
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
