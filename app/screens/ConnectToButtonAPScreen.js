import React from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, Image, WebView, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import Layout from '../constants/Layout';

export default class ConnectToButtonAPScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Setup',
    headerTitle: 'Button Setup',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#0C6A9B',
      height: Platform.OS === 'ios' ? 60 : 80,
      paddingTop: 20,
    },
  };

  render() {    
    return (
      <View style={styles.container}>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, textAlign: 'center', color: '#868686', fontWeight: 'bold' }}>
            Press and hold your Button for up to 6 seconds, until the light flashes blue, then tap
            <Text style={styles.bold}> Connect</Text>
          </Text>
          <Image
            style={{ justifyContent: 'center', alignSelf: 'center' }}
            source={require('../assets/images/pressButton.png')}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Button
            onPress={() => {
              if (Platform.OS === 'android') {
                this.props.navigation.navigate('saveCredentials')
              } else {
                this.props.navigation.navigate('iosSteps')
              }
            }}
            title="NEXT"
            buttonStyle={{ backgroundColor: '#0C6A9B' }}
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
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
});
