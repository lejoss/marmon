import React from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	ScrollView, 
	Platform, 
	Image, 
	WebView, 
	StatusBar,
	NetInfo,
	Alert
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions'

class ConnectingButtonScreen extends React.Component {
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
	
	async componentDidMount() {
    await this.props.requestConfigureButton();
    await this.props.requesProvisioning();
	}

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          <Text style={styles.bold}>Connecting to{"\n"} </Text>
          <Text style={styles.bold}>Dash Button...{"\n"} </Text>
          <Text style={styles.bold}>Do not close the app{"\n"} </Text>
          <Text style={styles.loading}>....</Text>
        </Text>         
      </View>
    );
  }
}

export default connect(null, actions)(ConnectingButtonScreen)
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
    position: 'relative',
    top: -20,
    color: '#868686',
    fontSize: 80,
    textAlign: 'center',
  }
});
