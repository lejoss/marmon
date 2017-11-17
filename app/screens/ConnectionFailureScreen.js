import React from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Layout from '../constants/Layout';

export default class ConnectionFailureScreen extends React.Component {
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          <Text style={styles.bold}>Connection Failed{"\n"} </Text>
          <Text style={styles.content}>Please check your internet connection{"\n"}</Text>
        </Text>        

        <View style={{ width: Layout.window.width, paddingHorizontal: 16 }}>
          <Button
						onPress={() => this.props.navigation.navigate('saveCredentials')}
            title="Retry"
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
