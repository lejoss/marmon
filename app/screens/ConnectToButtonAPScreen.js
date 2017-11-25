import React from 'react';
import { StyleSheet, Text, View, Platform, Image } from 'react-native';
import { Button } from 'react-native-elements';
import _ from 'lodash';
import Layout from '../constants/Layout';

export default class ConnectToButtonAPScreen extends React.Component {
  static navigationOptions = {
    headerTitle: `Button Setup`,
    headerBackTitle: null,
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#0C6A9B",
      height: Platform.OS === "ios" ? 60 : 80,
      paddingTop: 20
    }
  };

  constructor(props) {
    super(props)
    this.onPressDelayed = _.debounce(this._navigate, 150);
  } 

  _navigate() {    
    this.props.navigation.navigate('steps')
  }

  render() {    
    return (
      <View style={styles.container}>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8,  }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: '#868686' }}>
            Press and hold your Button for up to 6 seconds, until the light flashes blue, then tap Next
          </Text>
          <Image
            style={{ alignSelf: 'center' }}
            source={require('../assets/images/pressButton.png')}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Button
            onPress={this.onPressDelayed.bind(this)}
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
    paddingHorizontal: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
});
