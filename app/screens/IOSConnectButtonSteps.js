import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, Linking } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Layout from '../constants/Layout';


export default class IOSConnectButtonSteps extends Component {
  static navigationOptions = {
    tabBarLabel: 'Setup',
    headerTitle: `Button Setup`,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#0C6A9B',
      height: Platform.OS === 'ios' ? 60 : 56,
      paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.statusBarHeight,
    },
	};
	
	_openSettings() {
    Linking.openURL('app-settings:');
  }

  render() {
    const iconName = Platform.OS === 'ios' ? 'ios-arrow-round-forward' : 'md-arrow-forward';
    return (
      <View style={styles.container}>
        <View style={{ flex: 2, justifyContent: 'center', paddingHorizontal: 8 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#868686',
              paddingBottom: 20
            }}
          >
            Connect to your Dash Buttons's Wi-Fi
          </Text>
          <View style={{ paddingHorizontal: 16 }}>
            <Text style={{ color: '#868686' }}>1. Press the home button on your iPhone</Text>
            <Text style={{ color: '#868686' }}>
              2. Open{' '}
              <Text style={{ fontWeight: 'bold' }}>
                iPhone
								<Text style={{ fontWeight: 'bold', color: '#0C6A9B'}} onPress={() => this._openSettings()}>{' '}Settings{' '}</Text> 
								select Wi-Fi
              </Text>
            </Text>
            <Text style={{ color: '#868686' }}>
              3. Select Button{' '}
              <Text style={{ color: '#868686' }}>ConfigureMe - XXX network</Text>
            </Text>
            <Text style={{ color: '#868686' }}>4. Remember the last 3 letters from the Button ConfigureMe</Text>
            <Text style={{ color: '#868686' }}>5. Return to Marmon App and Continue</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center', flex: 1 }}>          
          <Button
            onPress={() => this.props.navigation.navigate('saveCredentials')}
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
});
