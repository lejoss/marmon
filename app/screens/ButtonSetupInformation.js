import React from 'react';
import { StyleSheet, Text, View, ScrollView, Platform, Image, WebView, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import Layout from '../constants/Layout';

export default class ButtonSetupInformation extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Setup',
    headerTitle: 'Button Setup',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#0C6A9B',
      height: Platform.OS === 'ios' ? 60 : 56,
      paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.statusBarHeight,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ fontSize: 14, textAlign: 'center', color: '#868686', fontWeight: 'bold' }}>
            Complete this one-setup where you will use your Dash Button.
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#868686',
              fontWeight: 'bold',
              textAlign: 'center',
              paddingTop: 20,
            }}
          >
            Have your Wi-Fi password ready
          </Text>
          <Image
            style={{ justifyContent: 'center', alignSelf: 'center' }}
            source={require('../assets/images/button.png')}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Button
            onPress={() => this.props.navigation.navigate('buttonMode')}
            title="NEXT"
            raised
            buttonStyle={{ backgroundColor: '#0C6A9B' }}
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
    paddingHorizontal: 16
  },
});
